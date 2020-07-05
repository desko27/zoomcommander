import React, { useRef } from 'react'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'chairman'
const GROUP_ID = 'speakers'
const LIST_TITLE = 'Presidente'
const LIST_COLOR = 'accent'

const BlockChairman = ({
  userIds,
  userData,
  setChairmanUserId,
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
      handler: () => setChairmanUserId(undefined)
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
          />
        )
      })}
    </LayoutBlock>
  )
}

export default BlockChairman
