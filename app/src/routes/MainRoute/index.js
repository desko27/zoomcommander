import React, { useState } from 'react'
import Bottleneck from 'bottleneck'

import KeyPressedProvider from '../../context/KeyPressed'
import useUsers, { getIsAudioMutedFromAudioStatus } from '../../hooks/useUsers'
import useZoomEvents from '../../hooks/useZoomEvents'
import sendZoomCommand from '../../common/sendZoomCommand'
import getUserObjects from '../../common/getUserObjects'

import Sidebar from '../../components/Sidebar'
import LayoutColumn from '../../components/LayoutColumn'
import Block from '../../components/Block'

import styles from './index.module.css'

const limiter = new Bottleneck({ minTime: 500 })

const MainRoute = () => {
  const [settingMuteSpontaneousPeople, setSettingMuteSpontaneousPeople] = useState()
  const { userIds, userData, updateUserData } = useUsers()

  // extra user id lists
  const [queueUserIds, setQueueUserIds] = useState([])
  const [platformUserIds, setPlatformUserIds] = useState([])
  const [commentsHistoryUserIds, setCommentsHistoryUserIds] = useState([])

  // extra user id slots
  const [chairmanUserId, setChairmanUserId] = useState()
  const [commentingUserId, setCommentingUserId] = useState()

  // derived lists
  const currentSpeakersIds = [
    ...(chairmanUserId ? [chairmanUserId] : []),
    ...platformUserIds
  ]
  const speakersColumnIds = [
    ...currentSpeakersIds,
    ...queueUserIds
  ]

  const users = getUserObjects(userIds, userData)
  const myself = users.find(user => user.isMySelf)

  useZoomEvents({
    USER_LEFT: data => {
      const leftUserIds = data.map(user => user.userid)

      // remove it from user id lists
      const usersLeftFilter = prev => prev.filter(id => !leftUserIds.includes(id))
      setQueueUserIds(usersLeftFilter)
      setPlatformUserIds(usersLeftFilter)
      setCommentsHistoryUserIds(usersLeftFilter)

      // remove it from user id slots
      const usersLeftRemoval = prev => leftUserIds.includes(prev) ? undefined : prev
      setChairmanUserId(usersLeftRemoval)
      setCommentingUserId(usersLeftRemoval)
    }
  })

  useZoomEvents({
    USER_AUDIO_STATUS_CHANGE: data => {
      const eventUsersArray = Array.isArray(data) ? data : [data]

      // Automatically lower all hands when commenting user gets audio
      eventUsersArray.forEach(eventUser => {
        const id = eventUser.userid
        if (commentingUserId !== id) return
        const isAudioMuted = getIsAudioMutedFromAudioStatus(eventUser)
        if (!isAudioMuted) lowerAllHands()
      })

      // Automatically mute spontaneous people
      if (settingMuteSpontaneousPeople) {
        eventUsersArray.forEach(eventUser => {
          const id = eventUser.userid

          // these people are supposed to speak, so it's ok
          if (
            myself.id === id ||
            commentingUserId === id ||
            chairmanUserId === id ||
            platformUserIds.includes(id)
          ) return

          const isAudioMuted = getIsAudioMutedFromAudioStatus(eventUser)
          if (!isAudioMuted) sendZoomCommand('muteAudio', id)
        })
      }
    }
  }, [
    settingMuteSpontaneousPeople,
    commentingUserId,
    chairmanUserId,
    platformUserIds,
    userIds,
    userData
  ])

  const targetSpeakerId = id => {
    // unmute target
    const currentUser = userData[id] || {}
    if (currentUser.isAudioMuted) limiter.wrap(() => sendZoomCommand('unMuteAudio', id))()

    // mute all unmutetd speakers (expect for the target)
    const currentSpeakers = getUserObjects(currentSpeakersIds, userData)
    const unMutedCurrentSpeakersWithoutTarget = currentSpeakers
      .filter(currentSpeaker => !currentSpeaker.isAudioMuted && currentSpeaker.id !== id)
    unMutedCurrentSpeakersWithoutTarget.forEach(currentSpeaker => {
      limiter.wrap(() => sendZoomCommand('muteAudio', currentSpeaker.id))()
    })
  }

  const muteAll = (middleFunction) => {
    // Mutes myself AND disables "Allow Participants to Unmute Themselves"
    const muteMyself = limiter.wrap(() => sendZoomCommand('muteAudio', myself.id))
    muteMyself()

    // Mutes the rest of users AND enables "Mute Participants on Entry"
    limiter.wrap(() => sendZoomCommand('muteAudio', 0))()

    // Call middle function (special for startMeeting's chairman unmuting)
    // so we don't wait for the next loop to finish... (Ensure "Allow Par...")
    if (typeof middleFunction === 'function') middleFunction()

    // Ensure "Allow Participants to Unmute Themselves" gets disabled xDDD...
    ;[1, 2, 3, 4, 5].forEach(muteMyself)
  }

  const startMeeting = () => {
    setSettingMuteSpontaneousPeople(true)
    muteAll(() => {
      if (chairmanUserId) limiter.wrap(() => sendZoomCommand('unMuteAudio', chairmanUserId))()
      limiter.wrap(() => sendZoomCommand('stopShare'))()
    })
  }

  const lowerAllHandsLocally = () => {
    const usersWithRaisedHand = users.filter(user => user.isRaisedHand || user.isNonVerbalFeedback)
    usersWithRaisedHand.forEach(user =>
      updateUserData(user.id, {
        isRaisedHand: false,
        isRaisedHandRevoked: false,
        isNonVerbalFeedback: false
      }))

    // move users to history
    setCommentsHistoryUserIds(prev => {
      const sortedUsersWithRaisedHandIds = usersWithRaisedHand
        .sort((userA, userB) =>
          Math.sign(userB.lastRaisedHandTimestamp - userA.lastRaisedHandTimestamp))
        .map(user => user.id)
      const prevWithoutPendingToInsert =
        prev.filter(userId => !sortedUsersWithRaisedHandIds.includes(userId))
      return [...sortedUsersWithRaisedHandIds, ...prevWithoutPendingToInsert]
    })
  }

  const lowerAllHands = () => {
    sendZoomCommand('lowerAllHands')
    lowerAllHandsLocally()
  }

  const targetCommentingId = id => {
    sendZoomCommand('unMuteAudio', id)
    setCommentingUserId(id)
  }

  return (
    <div className={styles.wrapper}>
      <KeyPressedProvider>
        <div className={styles.columnsWrapper}>
          <LayoutColumn>
            <Block.AllUsers
              userIds={userIds}
              userData={userData}
              speakersColumnIds={speakersColumnIds}
              setQueueUserIds={setQueueUserIds}
              targetCommentingId={targetCommentingId}
            />
            <Block.AudioNow
              userIds={userIds}
              userData={userData}
              muteAll={muteAll}
              settingMuteSpontaneousPeople={settingMuteSpontaneousPeople}
              setSettingMuteSpontaneousPeople={setSettingMuteSpontaneousPeople}
            />
          </LayoutColumn>
          <LayoutColumn>
            <Block.Chairman
              userIds={chairmanUserId && [chairmanUserId]}
              userData={userData}
              setChairmanUserId={setChairmanUserId}
              targetSpeakerId={targetSpeakerId}
            />
            <Block.Platform
              userIds={platformUserIds}
              userData={userData}
              setPlatformUserIds={setPlatformUserIds}
              targetSpeakerId={targetSpeakerId}
            />
            <Block.Queue
              userIds={queueUserIds}
              userData={userData}
              chairmanUserId={chairmanUserId}
              setQueueUserIds={setQueueUserIds}
              setPlatformUserIds={setPlatformUserIds}
              setChairmanUserId={setChairmanUserId}
              targetSpeakerId={targetSpeakerId}
            />
          </LayoutColumn>
          <LayoutColumn>
            <Block.Commenting
              userIds={commentingUserId && [commentingUserId]}
              userData={userData}
              setCommentingUserId={setCommentingUserId}
            />
            <Block.Comments
              userIds={userIds}
              userData={userData}
              lowerAllHands={lowerAllHands}
              targetCommentingId={targetCommentingId}
              commentsHistoryUserIds={commentsHistoryUserIds}
            />
          </LayoutColumn>
          {/* <LayoutColumn>
          <Block.Hosts
            userIds={userIds}
            userData={userData}
            targetCommentingId={targetCommentingId}
          />
        </LayoutColumn> */}
        </div>
      </KeyPressedProvider>
      <Sidebar startMeeting={startMeeting} />
    </div>
  )
}

export default MainRoute
