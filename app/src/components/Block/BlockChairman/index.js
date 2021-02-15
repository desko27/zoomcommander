import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'chairman'
const GROUP_ID = 'speakers'
const LIST_TITLE_LITERAL = 'block.chairman.title'
const LIST_COLOR = 'accent'

const BlockChairman = ({
  userIds,
  userData,
  updateUserData,
  setChairmanUserId,
  targetSpeakerId
}) => {
  const { t } = useTranslation('app')

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
      title={t(LIST_TITLE_LITERAL)}
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

export default BlockChairman
