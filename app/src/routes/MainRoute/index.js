import React, { useState } from 'react'
import Bottleneck from 'bottleneck'

import useUsers from '../../hooks/useUsers'
import useZoomEvents from '../../hooks/useZoomEvents'
import sendZoomCommand from '../../common/sendZoomCommand'
import getUserObjects from '../../common/getUserObjects'

import Sidebar from '../../components/Sidebar'
import LayoutColumn from '../../components/LayoutColumn'
import Block from '../../components/Block'

import styles from './index.module.css'

const ZN_USERROLE_HOST = 1
const ZN_USERROLE_COHOST = 2

const limiter = new Bottleneck({ minTime: 500 })

const hostUsersFilter = ({ userRole }) =>
  userRole === ZN_USERROLE_HOST || userRole === ZN_USERROLE_COHOST

const MainRoute = () => {
  const { userIds, userData, updateUserData } = useUsers()

  // extra user id lists
  const [queueUserIds, setQueueUserIds] = useState([])
  const [platformUserIds, setPlatformUserIds] = useState([])

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

  useZoomEvents({
    USER_LEFT: data => {
      const leftUserIds = data.map(user => user.userid)

      // remove it from user id lists
      const usersLeftFilter = prev => prev.filter(id => !leftUserIds.includes(id))
      setQueueUserIds(usersLeftFilter)
      setPlatformUserIds(usersLeftFilter)

      // remove it from user id slots
      const usersLeftRemoval = prev => leftUserIds.includes(prev) ? undefined : prev
      setChairmanUserId(usersLeftRemoval)
      setCommentingUserId(usersLeftRemoval)
    }
  })

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
    const users = getUserObjects(userIds, userData)
    const myself = users.find(user => user.isMySelf)

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
    muteAll(() => {
      if (!chairmanUserId) return
      limiter.wrap(() => sendZoomCommand('unMuteAudio', chairmanUserId))()
    })
  }

  const lowerAllHands = () => {
    const users = getUserObjects(userIds, userData)
    const usersWithRaisedHand = users.filter(user => user.isRaisedHand)
    sendZoomCommand('lowerAllHands')
    usersWithRaisedHand.forEach(user => updateUserData(user.id, { isRaisedHand: false }))
  }

  const targetCommentingId = id => {
    // TODO: lower all hands only after this user got audio?
    // By now let's do NOT automatically lower hands yet...
    // lowerAllHands()

    sendZoomCommand('unMuteAudio', id)
    setCommentingUserId(id)
  }

  return (
    <div className={styles.wrapper}>
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
          />
        </LayoutColumn>
        <LayoutColumn>
          <Block.Hosts
            userIds={userIds}
            userData={userData}
            hostUsersFilter={hostUsersFilter}
            targetCommentingId={targetCommentingId}
          />
        </LayoutColumn>
      </div>
      <Sidebar startMeeting={startMeeting} />
    </div>
  )
}

export default MainRoute
