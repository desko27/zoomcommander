import React, { useState } from 'react'

import getUserObjects from '../../../common/getUserObjects'
import fuzzySearch from '../../../common/fuzzySearch'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_TITLE = 'Comentarios'
const LIST_COLOR_NORMAL = 'primary'
const LIST_COLOR_HISTORY = 'white'

const BlockComments = ({
  userIds,
  userData,
  lowerAllHands,
  lowerAllHandsLocally,
  targetCommentingId
}) => {
  const [filterString, setFilterString] = useState()
  const [isHistory, setIsHistory] = useState()
  const users = getUserObjects(userIds, userData)
  const LIST_COLOR = isHistory ? LIST_COLOR_HISTORY : LIST_COLOR_NORMAL

  const getBlockUsers = () => {
    if (isHistory) {
      const usersRaisedHistory = users
        .filter(user =>
          !user.isRaisedHand && !user.isNonVerbalFeedback && user.lastRaisedHandTimestamp)
        .sort((userA, userB) =>
          Math.sign(userB.lastRaisedHandTimestamp - userA.lastRaisedHandTimestamp))
      return usersRaisedHistory
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

  const userActions = {
    default: {
      icon: 'award',
      color: 'primary',
      handler: targetCommentingId
    }
  }

  const handleCleanClick = () => {
    lowerAllHandsLocally()
  }

  const handleHistoryClick = () => {
    setIsHistory(prev => !prev)
  }

  const actionsNode = (
    <>
      {!isHistory && <button onClick={handleCleanClick}>x</button>}
      <button onClick={handleHistoryClick}>
        {isHistory ? '← Volver' : 'Historial'}
      </button>
    </>
  )

  return (
    <LayoutBlock
      color={LIST_COLOR}
      title={isHistory ? 'Historial' : `${LIST_TITLE} / ${blockUsers.length}`}
      onSearchChange={e => setFilterString(e.target.value)}
      actionsNode={actionsNode}
    >
      {displayUsers.map(user => {
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

export default BlockComments
