import React, { useEffect, useState } from 'react'
import KeyPressedContext from './context'

import useWindowEvents from '../../hooks/useWindowEvents'

const navOs = navigator.platform.toLowerCase()
const isMac = navOs.startsWith('mac')

const KEYCODE_OPTION = isMac ? 18 : 226
const KEYCODE_SHIFT = 16
const KEYCODE_COMMAND_LEFT = isMac ? 91 : 17
const KEYCODE_COMMAND_RIGHT = isMac ? 93 : 17

const KEYCODE_DICTIONARY = {
  [KEYCODE_OPTION]: 'option',
  [KEYCODE_SHIFT]: 'shift',
  [KEYCODE_COMMAND_LEFT]: 'command',
  [KEYCODE_COMMAND_RIGHT]: 'command'
}

export default ({ children }) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const resetKeyPressed = () => setKeyPressed(false)
  useWindowEvents({
    focus: resetKeyPressed,
    blur: resetKeyPressed
  })

  useEffect(() => {
    const setKeyState = (keyCode, state) => {
      setKeyPressed(state && KEYCODE_DICTIONARY[keyCode])
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

  return (
    <KeyPressedContext.Provider value={keyPressed}>
      {children}
    </KeyPressedContext.Provider>
  )
}
