import { useState, useEffect, useRef } from 'react'

import sendZoomCommand from '../../common/sendZoomCommand'

import useZoomEvents from '../useZoomEvents'

const { ZoomMeetingAudioStatus } = require('../../../../lib/settings')

const SYNCING_DUE_TO_MUTE_ALL_TIMEOUT = 500
const FIELDS_TO_COMPARE = [
  'userName', 'isHost', 'isVideoOn', 'isAudioMuted', 'audioStatus', 'userRole', 'userInfoType'
]

const ZN_USERROLE_HOST = 1
const ZN_USERROLE_COHOST = 2

export const hostUsersFilter = ({ userRole }) =>
  userRole === ZN_USERROLE_HOST || userRole === ZN_USERROLE_COHOST

const pickRandomColor = () => {
  const COLORS = ['success', 'error', 'accent', 'primary', 'pink', 'teal']
  const randomIndex = Math.floor(COLORS.length * Math.random())
  return COLORS[randomIndex]
}

export const getIsAudioMutedFromAudioStatus = eventUser => {
  const audioStatus = eventUser.audioStatus ?? eventUser.audioStauts
  const isAudioMuted = !(
    audioStatus === ZoomMeetingAudioStatus.Audio_UnMuted ||
    audioStatus === ZoomMeetingAudioStatus.Audio_UnMuted_ByHost ||
    audioStatus === ZoomMeetingAudioStatus.Audio_UnMutedAll_ByHost
  )
  return isAudioMuted
}

const getIsAudioMutedAllFromAudioStatus = eventUser => {
  const audioStatus = eventUser.audioStatus ?? eventUser.audioStauts
  return audioStatus === ZoomMeetingAudioStatus.Audio_MutedAll_ByHost
}

export default function useUsers () {
  const [userIds, setUserIds] = useState([])
  const [userData, setUserData] = useState({})

  // hack in order to achieve complete user data sync when "muting all" occurs
  const isSyncingDueToMuteAllRef = useRef()

  useEffect(() => {
    // get users for the first time
    sendZoomCommand('getParticipantsList').then(joinUsers)
  }, [])

  const updateUserData = (id, fieldsArgument) => {
    setUserData(prev => {
      const currentUserObject = prev[id] || {}
      const fields =
        typeof fieldsArgument === 'function' ? fieldsArgument(currentUserObject) : fieldsArgument
      return { ...prev, [id]: { ...currentUserObject, ...fields } }
    })
  }

  const joinUsers = (data, isSync) => {
    const joinedUserIds = data.map(user => user.userid)

    // add new user ids if any
    setUserIds(prev => {
      const newUserIds = [...prev, ...joinedUserIds.filter(id => !prev.includes(id))]

      // retrieve user data for newcomers
      joinedUserIds.forEach(id => {
        const isExistingUser = userIds.includes(id)

        sendZoomCommand('getUserInfoByUserID', id).then(
          response => {
            const { userID: id } = response
            updateUserData(
              id,
              currentUserObject => {
                const initialColor = currentUserObject.color
                  ? currentUserObject.color : pickRandomColor()

                const newUserObject = {
                  id,
                  color: initialColor,
                  ...response,
                  // replace `isAudioMuted` by our own `audioStatus` treatment approach
                  isAudioMuted: getIsAudioMutedFromAudioStatus(response)
                }

                // [START] joinUsers hack to notice non-verbal feedback !!
                const { isNonVerbalFeedback } = currentUserObject
                const isCurrentVsNewTheSame = () =>
                  FIELDS_TO_COMPARE
                    .every(field => currentUserObject[field] === newUserObject[field])

                const isUserWhoCannotRaiseHand = hostUsersFilter(newUserObject)
                if (
                  !isSync &&
                  isUserWhoCannotRaiseHand &&
                  isExistingUser &&
                  !isNonVerbalFeedback &&
                  isCurrentVsNewTheSame()
                ) {
                  // No info has changed! "Raise hand"! (via `isNonVerbalFeedback` property)
                  // This makes possible to see non-verbal feedback on the comments block
                  return {
                    ...newUserObject,
                    isNonVerbalFeedback: true,
                    lastRaisedHandTimestamp: Date.now()
                  }
                }
                // [END] joinUsers hack to notice non-verbal feedback !!

                return newUserObject
              }
            )
          }
        )
      })

      return newUserIds
    })
  }

  const syncUserData = ({ reload = false } = {}) =>
    sendZoomCommand('getParticipantsList').then(
      data => {
        if (reload) {
          setUserIds([])
          setUserData({})
        }
        joinUsers(data, true) // isSync = true}
      }
    )

  useZoomEvents({
    USER_JOINED: joinUsers,
    USER_LEFT: data => {
      const leftUserIds = data.map(user => user.userid)
      setUserIds(prev => prev.filter(id => !leftUserIds.includes(id)))
      setUserData(prev => {
        const userDataAfterLeft = Object.entries(prev).reduce((acc, [key, value]) => {
          if (leftUserIds.includes(+key)) return acc
          return { ...acc, [key]: value }
        }, {})
        return userDataAfterLeft
      })
    },
    USER_AUDIO_STATUS_CHANGE: data => {
      const eventUsersArray = Array.isArray(data) ? data : [data]
      const mapEventUserData = eventUser => {
        const id = eventUser.userid
        if (!userIds.includes(id)) return
        const isAudioMuted = getIsAudioMutedFromAudioStatus(eventUser)
        const isAudioMutedAll = getIsAudioMutedAllFromAudioStatus(eventUser)
        return { id, isAudioMuted, isAudioMutedAll }
      }
      setUserData(prev => {
        const eventUserData = eventUsersArray.reduce((acc, eventUser) => {
          const eventUserData = mapEventUserData(eventUser)
          if (!eventUserData) return acc
          const { id, isAudioMuted, isAudioMutedAll } = eventUserData

          // hack in order to achieve complete user data sync when "muting all" occurs
          if (isAudioMutedAll && !isSyncingDueToMuteAllRef.current) {
            isSyncingDueToMuteAllRef.current = true
            syncUserData()
            setTimeout(() => {
              isSyncingDueToMuteAllRef.current = false
            }, SYNCING_DUE_TO_MUTE_ALL_TIMEOUT)
          }

          const currentUserObject = prev[id]
          if (!currentUserObject) return acc
          return {
            ...acc,
            [id]: {
              ...currentUserObject,
              isAudioMuted,
              lastAudioUnMutedTimestamp:
                !isAudioMuted ? Date.now() : currentUserObject.lastRaisedHandTimestamp
            }
          }
        }, {})
        return { ...prev, ...eventUserData }
      })
    },
    ON_LOW_OR_RAISE_HAND_STATUS_CHANGED: data => {
      const { userId, isRaisedHand } = data
      updateUserData(userId, currentUserObject => {
        const { isRaisedHand: existingiIsRaisedHand } = currentUserObject
        return {
          isRaisedHand: isRaisedHand || existingiIsRaisedHand,
          isRaisedHandRevoked: !isRaisedHand,
          lastRaisedHandTimestamp:
            isRaisedHand && !existingiIsRaisedHand
              ? Date.now() : currentUserObject.lastRaisedHandTimestamp
        }
      })
    }
  }, [userIds])

  return {
    userIds,
    userData,
    updateUserData,
    syncUserData
  }
}
