import React, { useRef } from 'react'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'platform'
const GROUP_ID = 'speakers'
const LIST_TITLE = 'Plataforma ahora'
const LIST_COLOR = 'accent'

const BlockPlatform = ({
  userIds,
  userData,
  updateUserData,
  setPlatformUserIds,
  targetSpeakerId
}) => {
  const userActionsRef = useRef()
  const users = getUserObjects(userIds, userData)

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

  return (
    <LayoutBlock
      isDroppable
      dontGrow
      id={LIST_ID}
      title={LIST_TITLE}
      color={LIST_COLOR}
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
