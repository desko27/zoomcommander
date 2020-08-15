import React, { useRef, useState } from 'react'

import getUserObjects from '../../../common/getUserObjects'
import fuzzySearch from '../../../common/fuzzySearch'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'all-users'
const GROUP_ID = LIST_ID
const LIST_TITLE = 'Todos'
const LIST_COLOR = 'white'

const BlockAllUsers = ({
  userIds,
  userData,
  updateUserData,
  speakersColumnIds,
  setQueueUserIds,
  targetCommentingId,
  resetUserData,
  syncUserData
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
      isDroppable
      id={LIST_ID}
      flexBasis={70}
      title={`${LIST_TITLE} / ${users.length}`}
      onSearchChange={e => setFilterString(e.target.value)}
      searchValue={filterString}
      searchReset={() => setFilterString()}
      actionsNode={(
        <>
          <button onClick={() => resetUserData()}>Reset</button>
          <button onClick={() => syncUserData()}>Sync</button>
        </>
      )}
    >
      {displayUsers.map((user, index) => {
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

export default BlockAllUsers
