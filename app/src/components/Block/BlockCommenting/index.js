import React from 'react'

import getUserObjects from '../../../common/getUserObjects'
import sendZoomCommand from '../../../common/sendZoomCommand'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_TITLE = 'Comentando ahora'
const LIST_COLOR = 'success'

const BlockCommenting = ({ userIds, userData, setCommentingUserId }) => {
  const users = getUserObjects(userIds, userData)

  const userActions = {
    default: {
      icon: 'user-x',
      color: 'success',
      handler: id => {
        sendZoomCommand('muteAudio', id)
        setCommentingUserId(undefined)
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

export default BlockCommenting
