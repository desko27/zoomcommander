import React, { useRef, useState } from 'react'

import getUserObjects from '../../../common/getUserObjects'
import fuzzySearch from '../../../common/fuzzySearch'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_TITLE = 'Todos'
const LIST_COLOR = 'white'

const BlockAllUsers = ({
  userIds,
  userData,
  speakersColumnIds,
  setQueueUserIds,
  targetCommentingId
}) => {
  const userActionsRef = useRef()
  const [filterString, setFilterString] = useState()
  const users = getUserObjects(userIds, userData)
  const filteredUsers = filterString && fuzzySearch(users, filterString)
  const displayUsers = filteredUsers || users

  userActionsRef.current = {
    default: {
      icon: 'award',
      color: 'primary',
      handler: targetCommentingId
    },
    option: {
      icon: 'user-plus',
      color: 'pink',
      handler: id => {
        if (speakersColumnIds.includes(id)) return // can't add someone already in speakers col.
        setQueueUserIds(prev => ([...prev, id]))
      }
    }
  }

  return (
    <LayoutBlock
      flexBasis={70}
      title={LIST_TITLE}
      onSearchChange={e => setFilterString(e.target.value)}
    >
      {displayUsers.map(user => {
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

export default BlockAllUsers
