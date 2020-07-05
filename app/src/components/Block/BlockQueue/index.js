import React, { useRef } from 'react'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_TITLE = 'Cola'
const LIST_COLOR = 'pink'

const BlockQueue = ({
  userIds,
  userData,
  chairmanUserId,
  setQueueUserIds,
  setPlatformUserIds,
  setChairmanUserId,
  targetSpeakerId
}) => {
  const userActionsRef = useRef()
  const users = getUserObjects(userIds, userData)

  const moveUserOutOfQueue = id => {
    setQueueUserIds(prev => prev.filter(qId => qId !== id))
    if (!chairmanUserId) return setChairmanUserId(id)
    setPlatformUserIds(prev => ([...prev, id]))
  }

  userActionsRef.current = {
    default: {
      icon: 'target',
      color: 'accent',
      handler: id => {
        targetSpeakerId(id)
        moveUserOutOfQueue(id)
      }
    },
    option: {
      icon: 'user-plus',
      color: 'accent',
      handler: id => moveUserOutOfQueue(id) // move without getting attention
    },
    shift: {
      icon: 'user-x',
      color: 'pink',
      handler: id => {
        setQueueUserIds(prev => prev.filter(qId => qId !== id))
      }
    }
  }

  return (
    <LayoutBlock
      title={LIST_TITLE}
      color={LIST_COLOR}
    >
      {users.map(user => {
        return (
          <UserItem
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

export default BlockQueue
