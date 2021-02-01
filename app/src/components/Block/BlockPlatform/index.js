import React, { useRef } from 'react'

import getUserObjects from '../../../common/getUserObjects'
import sendZoomCommand from '../../../common/sendZoomCommand'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'platform'
const GROUP_ID = 'speakers'
const LIST_TITLE = 'Plataforma ahora'
const LIST_COLOR_NORMAL = 'accent'
const LIST_COLOR_SPOTLIGHT = 'error'

const BlockPlatform = ({
  userIds,
  userData,
  updateUserData,
  setPlatformUserIds,
  targetSpeakerId,
  settingSpotlightPlatform,
  setSettingSpotlightPlatform
}) => {
  const userActionsRef = useRef()
  const users = getUserObjects(userIds, userData)
  const LIST_COLOR = settingSpotlightPlatform ? LIST_COLOR_SPOTLIGHT : LIST_COLOR_NORMAL

  userActionsRef.current = {
    default: {
      icon: 'target',
      color: 'accent',
      handler: targetSpeakerId
    },
    shift: {
      icon: 'user-x',
      color: 'error',
      handler: id => {
        setPlatformUserIds(prev => prev.filter(pId => pId !== id))
      }
    }
  }

  const handleSpotlightPlatform = () => {
    const nextValue = !settingSpotlightPlatform
    /**
     * Test `spotlightVideo` command
     */
    sendZoomCommand('spotlightVideo', users[0].id, nextValue).then(console.log)
    setSettingSpotlightPlatform(nextValue)
  }

  return (
    <LayoutBlock
      isDroppable
      dontGrow
      id={LIST_ID}
      title={LIST_TITLE}
      color={LIST_COLOR}
      actionsNode={(
        <>
          <button
            onClick={handleSpotlightPlatform}
            style={settingSpotlightPlatform ? { '--local-color': 'var(--c-error)' } : {}}
          >
            {settingSpotlightPlatform ? '✦ Destacando' : 'Destacar vídeo'}
          </button>
        </>
      )}
    >
      {users.map((user, index) => {
        return (
          <UserItem
            isDraggable
            index={index}
            groupId={GROUP_ID}
            {...user}
            key={user.id}
            actionsRef={userActionsRef}
            nameColor={LIST_COLOR}
            updateUserData={updateUserData}
          />
        )
      })}
    </LayoutBlock>
  )
}

export default BlockPlatform
