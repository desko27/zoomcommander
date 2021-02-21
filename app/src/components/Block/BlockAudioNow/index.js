import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import getUserObjects from '../../../common/getUserObjects'

import UserItem from '../../UserItem'
import LayoutBlock from '../../LayoutBlock'

const LIST_ID = 'audio-now'
const LIST_TITLE_LITERAL = 'block.audioNow.title'
const LIST_COLOR = 'white'

const BlockAudioNow = ({
  userIds,
  userData,
  updateUserData,
  muteAll,
  settingMuteSpontaneousPeople,
  setSettingMuteSpontaneousPeople
}) => {
  const { t } = useTranslation('app')

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
      title={`${t(LIST_TITLE_LITERAL)} / ${usersWithAudioNow.length}`}
      actionsNode={(
        <>
          <button
            onClick={() => setSettingMuteSpontaneousPeople(prev => !prev)}
            style={settingMuteSpontaneousPeople ? { '--local-color': 'var(--c-success)' } : {}}
          >
            {settingMuteSpontaneousPeople
              ? t('block.audioNow.shieldActive')
              : t('block.audioNow.activateShield')}
          </button>
          <button onClick={muteAll}>{t('block.audioNow.muteAll')}</button>
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
            updateUserData={updateUserData}
          />
        )
      })}
    </LayoutBlock>
  )
}

export default BlockAudioNow
