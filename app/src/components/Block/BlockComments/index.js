import React, { useState } from 'react'

import getUserObjects from '../../../common/getUserObjects'
import fuzzySearch from '../../../common/fuzzySearch'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_TITLE = 'Comentarios'
const LIST_COLOR = 'primary'

const BlockComments = ({
  userIds,
  userData,
  lowerAllHands,
  targetCommentingId
}) => {
  const [filterString, setFilterString] = useState()
  const users = getUserObjects(userIds, userData)
  const usersWithRaisedHand = users
    .filter(user => user.isRaisedHand)
    .sort((userA, userB) =>
      Math.sign(userA.lastRaisedHandTimestamp - userB.lastRaisedHandTimestamp))
  const filteredUsers = filterString && fuzzySearch(usersWithRaisedHand, filterString)
  const displayUsers = filteredUsers || usersWithRaisedHand

  const userActions = {
    default: {
      icon: 'award',
      color: 'primary',
      handler: targetCommentingId
    }
  }

  return (
    <LayoutBlock
      color={LIST_COLOR}
      title={`${LIST_TITLE} / ${usersWithRaisedHand.length}`}
      onSearchChange={e => setFilterString(e.target.value)}
      actionsNode={<button onClick={lowerAllHands}>Bajar manos</button>}
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
