import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import getUserObjects from '../../../common/getUserObjects'
import sendZoomCommand from '../../../common/sendZoomCommand'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'commenting'
const LIST_TITLE_LITERAL = 'block.commenting.title'
const LIST_COLOR = 'success'

const BlockCommenting = ({
  userIds,
  userData,
  updateUserData,
  setCommentingUserId
}) => {
  const { t } = useTranslation('app')

  const userActionsRef = useRef()
  const users = getUserObjects(userIds, userData)

  userActionsRef.current = {
    default: {
      icon: 'user-x',
      color: 'success',
      handler: id => {
        sendZoomCommand('muteAudio', id)
        setCommentingUserId(undefined)
      }
    },
    shift: {
      icon: 'user-x',
      color: 'error',
      handler: id => {
        // remove user from list without muting him/her
        setCommentingUserId(undefined)
      }
    }
  }

  return (
    <LayoutBlock
      dontGrow
      id={LIST_ID}
      title={t(LIST_TITLE_LITERAL)}
      color={LIST_COLOR}
    >
      {users.map(user => {
        return (
          <UserItem
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

export default BlockCommenting
