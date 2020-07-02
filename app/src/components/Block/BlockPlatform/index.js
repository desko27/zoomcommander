import React from 'react'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_TITLE = 'Plataforma ahora'
const LIST_COLOR = 'accent'

const BlockPlatform = ({
  userIds,
  userData,
  setPlatformUserIds,
  targetSpeakerId
}) => {
  const users = getUserObjects(userIds, userData)

  const userActions = {
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
      dontGrow
      title={LIST_TITLE}
      color={LIST_COLOR}
    >
      {users.map(user => {
        return (
          <UserItem
            {...user}
            key={user.id}
            actions={userActions}
            nameColor={LIST_COLOR}
          />
        )
      })}
    </LayoutBlock>
  )
}

export default BlockPlatform
