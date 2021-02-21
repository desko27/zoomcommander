import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import getUserObjects from '../../../common/getUserObjects'
import fuzzySearch from '../../../common/fuzzySearch'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'comments'
const LIST_TITLE_LITERAL = 'block.comments.title'
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
  const { t } = useTranslation('app')

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
      .filter(user => user.isRaisedHand)
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
      {!isHistory && (
        <button onClick={handleCleanClick}>{t('block.comments.cleanUp')}</button>
      )}
      <button onClick={handleHistoryClick}>
        {isHistory ? `← ${t('block.comments.goBack')}` : t('block.comments.history')}
      </button>
    </>
  )

  const title = isHistory
    ? t('block.comments.history')
    : `${t(LIST_TITLE_LITERAL)} / ${blockUsers.length}`

  return (
    <LayoutBlock
      id={LIST_ID}
      color={LIST_COLOR}
      title={title}
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
            nameColor={LIST_COLOR}
            updateUserData={updateUserData}
            isGhost={!isHistory && user.isRaisedHandRevoked}
          />
        )
      })}
    </LayoutBlock>
  )
}

export default BlockComments
