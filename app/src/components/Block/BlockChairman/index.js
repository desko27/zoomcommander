import React from 'react'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_TITLE = 'Presidente'
const LIST_COLOR = 'accent'

const BlockChairman = ({
  userIds,
  userData,
  setChairmanUserId,
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
      handler: () => setChairmanUserId(undefined)
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

export default BlockChairman
