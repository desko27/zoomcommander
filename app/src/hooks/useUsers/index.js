import { useState, useEffect } from 'react'

import sendZoomCommand from '../../common/sendZoomCommand'

import useZoomEvents from '../useZoomEvents'

const { ZoomMeetingAudioStatus } = require('../../../../lib/settings')

const FIELDS_TO_COMPARE = [
  'userName', 'isHost', 'isVideoOn', 'isAudioMuted', 'userRole', 'userInfoType'
]

const ZN_USERROLE_HOST = 1
const ZN_USERROLE_COHOST = 2

const hostUsersFilter = ({ userRole }) =>
  userRole === ZN_USERROLE_HOST || userRole === ZN_USERROLE_COHOST

const pickRandomColor = () => {
  const COLORS = ['success', 'error', 'accent', 'primary', 'pink', 'teal']
  const randomIndex = Math.floor(COLORS.length * Math.random())
  return COLORS[randomIndex]
}

export default function useUsers () {
  const [userIds, setUserIds] = useState([])
  const [userData, setUserData] = useState({})

  useEffect(() => {
    // get users for the first time
    sendZoomCommand('getParticipantsList').then(joinUsers)
  }, [])

  const updateUserData = (id, fieldsArgument) => {
    if (!userIds.includes(id)) return // maybe userid is not in userIds anymore)
    setUserData(prev => {
      const currentUserObject = prev[id] || {}
      const fields =
        typeof fieldsArgument === 'function' ? fieldsArgument(currentUserObject) : fieldsArgument
      return { ...prev, [id]: { ...currentUserObject, ...fields } }
    })
  }

  useEffect(() => {
    // retrieve user data every time user ids change
    // TODO: this should be only done for the users which are added, not everyone?
    userIds.forEach(id => {
      sendZoomCommand('getUserInfoByUserID', id).then(
        response => {
          const { userID: id } = response
          updateUserData(id, currentUserObject => {
            const color = currentUserObject.color ? currentUserObject.color : pickRandomColor()
            const newUserObject = { id, color, ...response }

            // [START] React to joinUsers hack !!
            const { userJoinedHack } = currentUserObject
            const isCurrentVsNewTheSame = () =>
              FIELDS_TO_COMPARE
                .every(field => currentUserObject[field] === newUserObject[field])

            const isUserWhoCannotRaiseHand = hostUsersFilter(newUserObject)
            if (isUserWhoCannotRaiseHand && userJoinedHack && isCurrentVsNewTheSame()) {
              // No info has changed! "Raise hand"! (via `isNonVerbalFeedback` property)
              // This makes possible to see non-verbal feedback on the comments block
              return {
                ...newUserObject,
                isNonVerbalFeedback: true,
                lastRaisedHandTimestamp: Date.now()
              }
            }
            // [END] React to joinUsers hack !!

            return newUserObject
          })
        }
      )
    })
  }, [userIds])

  const joinUsers = data => {
    const joinedUserIds = data.map(user => user.userid)

    // Welcome to the joinUsers hack !!
    // If some user is NOT NEW, add userJoinedHack property
    joinedUserIds.forEach(userId => {
      if (!userIds.includes(userId)) return // it's a new user, do nothing
      updateUserData(userId, { userJoinedHack: true })
    })

    // add new user ids if any
    setUserIds(prev => {
      return [...prev, ...joinedUserIds.filter(id => !prev.includes(id))]
    })
  }

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
      const eventUserDataArray = eventUsersArray.map(eventUser => {
        const id = eventUser.userid
        if (!userIds.includes(id)) return
        const audioStatus = eventUser.audioStatus || eventUser.audioStauts
        const isAudioMuted = audioStatus === ZoomMeetingAudioStatus.Audio_Muted ||
          audioStatus === ZoomMeetingAudioStatus.Audio_Muted_ByHost ||
          audioStatus === ZoomMeetingAudioStatus.Audio_MutedAll_ByHost
        return { id, isAudioMuted }
      })
      setUserData(prev => {
        const eventUserData = eventUserDataArray.reduce((acc, eventUserData) => {
          if (!eventUserData) return acc
          const { id, isAudioMuted } = eventUserData
          const currentUserObject = prev[id]
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
        return {
          isRaisedHand,
          lastRaisedHandTimestamp:
            isRaisedHand ? Date.now() : currentUserObject.lastRaisedHandTimestamp
        }
      })
    }
  }, [userIds])

  return { userIds, userData, updateUserData }
}
