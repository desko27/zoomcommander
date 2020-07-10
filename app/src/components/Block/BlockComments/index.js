import React, { useRef, useState } from 'react'

import getUserObjects from '../../../common/getUserObjects'
import fuzzySearch from '../../../common/fuzzySearch'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'comments'
const LIST_TITLE = 'Comentarios'
const LIST_COLOR_NORMAL = 'primary'
const LIST_COLOR_HISTORY = 'white'

const BlockComments = ({
  userIds,
  userData,
  updateUserData,
  lowerAllHands,
  targetCommentingId,
  commentsHistoryUserIds
}) => {
  const userActionsRef = useRef()
  const [filterString, setFilterString] = useState()
  const [isHistory, setIsHistory] = useState()
  const users = getUserObjects(userIds, userData)
  const LIST_COLOR = isHistory ? LIST_COLOR_HISTORY : LIST_COLOR_NORMAL

  const getBlockUsers = () => {
    if (isHistory) {
      return getUserObjects(commentsHistoryUserIds, userData)
    }

    const usersWithRaisedHand = users
      .filter(user => user.isRaisedHand || user.isNonVerbalFeedback)
      .sort((userA, userB) =>
        Math.sign(userA.lastRaisedHandTimestamp - userB.lastRaisedHandTimestamp))
    return usersWithRaisedHand
  }

  const blockUsers = getBlockUsers()

  // apply filters
  const filteredUsers = filterString && fuzzySearch(blockUsers, filterString)
  const displayUsers = filteredUsers || blockUsers

  userActionsRef.current = {
    default: {
      icon: 'award',
      color: 'primary',
      handler: targetCommentingId
    }
  }

  const handleCleanClick = () => {
    lowerAllHands()
  }

  const handleHistoryClick = () => {
    setIsHistory(prev => !prev)
  }

  const actionsNode = (
    <>
      {!isHistory && <button onClick={handleCleanClick}>Limpiar</button>}
      <button onClick={handleHistoryClick}>
        {isHistory ? '← Volver' : 'Historial'}
      </button>
    </>
  )

  return (
    <LayoutBlock
      id={LIST_ID}
      color={LIST_COLOR}
      title={isHistory ? 'Historial' : `${LIST_TITLE} / ${blockUsers.length}`}
      searchValue={filterString}
      searchReset={() => setFilterString()}
      onSearchChange={e => setFilterString(e.target.value)}
      actionsNode={actionsNode}
    >
      {displayUsers.map(user => {
        return (
          <UserItem
            {...user}
            key={user.id}
            actionsRef={userActionsRef}
            nameColor={!isHistory && user.isNonVerbalFeedback ? 'error' : LIST_COLOR}
            updateUserData={updateUserData}
            isGhost={!isHistory && user.isRaisedHandRevoked}
          />
        )
      })}
    </LayoutBlock>
  )
}

export default BlockComments
