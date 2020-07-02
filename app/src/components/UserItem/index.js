import React, { useState, useEffect } from 'react'
import sendZoomCommand from '../../common/sendZoomCommand'

import UserAction from './UserAction'
import styles from './index.module.css'

const KEYCODE_OPTION = 18
const KEYCODE_SHIFT = 16
const KEYCODE_COMMAND = 91

const UserItem = ({
  id,
  color,
  nameColor,
  isAudioMuted,
  userName = '',
  actions
}) => {
  const [isHover, setIsHover] = useState()
  const [isOptionPressed, setIsOptionPressed] = useState()
  const [isShiftPressed, setIsShiftPressed] = useState()
  const [isCommandPressed, setIsCommandPressed] = useState()
  const nameInitials = userName.split(' ').slice(0, 2).map(word => word[0]).join('')

  useEffect(() => {
    const setKeyState = (keyCode, state) => {
      if (keyCode === KEYCODE_OPTION) setIsOptionPressed(state)
      if (keyCode === KEYCODE_SHIFT) setIsShiftPressed(state)
      if (keyCode === KEYCODE_COMMAND) setIsCommandPressed(state)
    }
    const handleKeyDown = e => setKeyState(e.keyCode, true)
    const handleKeyUp = e => setKeyState(e.keyCode, false)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const getHoverActionType = () => {
    if (!isHover) return null
    if (isOptionPressed && actions.option) return 'option'
    if (isShiftPressed && actions.shift) return 'shift'
    if (isCommandPressed && actions.command) return 'command'
    if (actions.default) return 'default'
    return null
  }

  const hoverActionType = getHoverActionType()
  const hoverAction = actions[hoverActionType]
  const isDefaultHoverAction = !hoverAction || (isCommandPressed && hoverActionType !== 'command')

  const renderActions = () => {
    if (isDefaultHoverAction) {
      if (!isAudioMuted) return <UserAction icon='mic' color='success' />
      if (isAudioMuted && isHover) return <UserAction icon='mic-off' />
    }
    if (hoverAction) return <UserAction {...hoverAction} />
    return null
  }

  const getNameColor = () => {
    if (hoverAction) return hoverAction.color || nameColor
    return nameColor
  }

  const handleClick = id => {
    if (isDefaultHoverAction) {
      if (isAudioMuted) return sendZoomCommand('unMuteAudio', id)
      return sendZoomCommand('muteAudio', id)
    }
    if (hoverAction && hoverAction.handler) return hoverAction.handler(id)
  }

  return (
    <div
      className={styles.wrapper}
      onClick={() => handleClick(id)}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <div className={styles.avatar} style={{ background: `var(--c-${color})` }}>
        {nameInitials}
      </div>
      <span className={styles.userName} style={{ color: `var(--c-${getNameColor()})` }}>
        {userName}
      </span>
      <span className={styles.actions}>{renderActions()}</span>
    </div>
  )
}

export default UserItem
