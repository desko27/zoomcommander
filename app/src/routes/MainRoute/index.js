import React, { useState } from 'react'
import Bottleneck from 'bottleneck'

import useUsers from '../../hooks/useUsers'
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
  const [queueUserIds, setQueueUserIds] = useState([])
  const [platformUserIds, setPlatformUserIds] = useState([])
  const [chairmanUserId, setChairmanUserId] = useState()
  const [commentingUserId, setCommentingUserId] = useState()

  const currentSpeakersIds = [
    ...(chairmanUserId ? [chairmanUserId] : []),
    ...platformUserIds
  ]
  const speakersColumnIds = [
    ...currentSpeakersIds,
    ...queueUserIds
  ]

  const targetSpeakerId = id => {
    const currentSpeakers = getUserObjects(currentSpeakersIds, userData)

    // mute all unmutetd speakers
    currentSpeakers.forEach(currentSpeaker => {
      if (currentSpeaker.isAudioMuted) return
      limiter.wrap(() => sendZoomCommand('muteAudio', currentSpeaker.id))()
    })

    // unmute target
    limiter.wrap(() => sendZoomCommand('unMuteAudio', id))()
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
      <Sidebar />
    </div>
  )
}

export default MainRoute
