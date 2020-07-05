import React, { useRef } from 'react'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'audio-now'
const LIST_TITLE = 'Audio'
const LIST_COLOR = 'white'

const BlockAudioNow = ({
  userIds,
  userData,
  muteAll,
  settingMuteSpontaneousPeople,
  setSettingMuteSpontaneousPeople
}) => {
  const userActionsRef = useRef()
  const users = getUserObjects(userIds, userData)
  const usersWithAudioNow = users
    .filter(user => !user.isAudioMuted)
    .sort((userA, userB) =>
      Math.sign(userA.lastAudioUnMutedTimestamp - userB.lastAudioUnMutedTimestamp))

  userActionsRef.current = {}

  return (
    <LayoutBlock
      id={LIST_ID}
      flexBasis={30}
      color={LIST_COLOR}
      title={`${LIST_TITLE} / ${usersWithAudioNow.length}`}
      actionsNode={(
        <>
          <button
            onClick={() => setSettingMuteSpontaneousPeople(prev => !prev)}
            style={settingMuteSpontaneousPeople ? { '--local-color': 'var(--c-success)' } : {}}
          >
            {settingMuteSpontaneousPeople ? 'Escudo activo' : 'Activar escudo'}
          </button>
          <button onClick={muteAll}>Mutear todos</button>
        </>
      )}
    >
      {usersWithAudioNow.map(user => {
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

export default BlockAudioNow
