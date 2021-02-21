import React from 'react'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'
import vex from 'vex-js'

import sendZoomCommand from '../../../common/sendZoomCommand'
import UserAction from '../UserAction'

import styles from './index.module.css'

const UserItem = ({
  id,
  color,
  isGhost,
  nameColor,
  isAudioMuted,
  userName = '',
  notes,
  actionsRef,
  onMouseEnter,
  onMouseLeave,
  isHover,
  keyPressed,
  isDragging,
  updateUserData
}) => {
  const { t } = useTranslation('app')
  const nameInitials = userName.split(' ').slice(0, 2).map(word => word[0]).join('')

  const getHoverActionAttributes = () => {
    const getHoverActionType = () => {
      if (!isHover) return null
      if (keyPressed === 'option' && actionsRef.current.option) return 'option'
      if (keyPressed === 'shift' && actionsRef.current.shift) return 'shift'
      if (keyPressed === 'command' && actionsRef.current.command) return 'command'
      if (actionsRef.current.default) return 'default'
      return null
    }
    const hoverActionType = getHoverActionType()
    const hoverAction = actionsRef.current[hoverActionType]
    const isDefaultHoverAction =
      !hoverAction || (keyPressed === 'command' && hoverActionType !== 'command')
    return { hoverAction, isDefaultHoverAction }
  }

  const handleContextMenu = () => {
    vex.dialog.prompt({
      message: t('userItem.notesDialog', { userName }),
      callback: value => {
        if (value === false) return // cancel, original value is kept
        updateUserData(id, { notes: value })
      },
      value: notes
    })
  }

  const handleClick = id => {
    // Get hover actions attributes right at click time so we get the latest ref values
    // (especially for `handler` since the latest one must be used here).
    const { hoverAction, isDefaultHoverAction } = getHoverActionAttributes()

    if (isDefaultHoverAction) {
      if (isAudioMuted) return sendZoomCommand('unMuteAudio', id)
      return sendZoomCommand('muteAudio', id)
    }
    if (hoverAction && hoverAction.handler) return hoverAction.handler(id)
  }

  // Get hover actions attributes for render, no matter whether it is updated or not
  // since `handler` is not going to be used on these render functions and the rest
  // of values do not update often (or even never).
  const { hoverAction, isDefaultHoverAction } = getHoverActionAttributes()
  const renderActions = () => {
    if (isDefaultHoverAction) {
      if (!isAudioMuted) return <UserAction icon='mic' color='success' />
      if (isAudioMuted && isHover) return <UserAction icon='mic-off' />
    }
    if (hoverAction) return <UserAction {...hoverAction} />
    return null
  }
  const renderNameColor = () => {
    if (hoverAction) return hoverAction.color || nameColor
    return nameColor
  }

  return (
    <div
      className={cx(styles.wrapper, isDragging && styles.isDragging)}
      style={{ opacity: isGhost ? 0.5 : 1 }}
      onClick={() => handleClick(id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.avatar} style={{ background: `var(--c-${color})` }}>
        {nameInitials}
      </div>
      <div className={styles.content} style={{ color: `var(--c-${renderNameColor()})` }}>
        <div className={styles.userName}>
          {userName}
        </div>
        {notes && (
          <div className={styles.notes}>
            {notes}
          </div>
        )}
      </div>
      <div className={styles.actions}>{renderActions()}</div>
    </div>
  )
}

export default React.memo(UserItem, (prevProps, nextProps) => {
  const keyPressedEqual = prevProps.keyPressed === nextProps.keyPressed
  const isHoverEqual = prevProps.isHover === nextProps.isHover
  return (
    prevProps.isGhost === nextProps.isGhost &&
    prevProps.nameColor === nextProps.nameColor &&
    prevProps.isAudioMuted === nextProps.isAudioMuted &&
    prevProps.userName === nextProps.userName &&
    prevProps.notes === nextProps.notes &&
    prevProps.isDragging === nextProps.isDragging &&
    isHoverEqual &&
    (keyPressedEqual || !nextProps.isHover)
  )
})
