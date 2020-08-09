import React, { useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

function LobbyRoute () {
  const history = useHistory()

  useLayoutEffect(() => {
    ipcRenderer.send('main-window-ready')
  }, [])

  const handleStartMeeting = () => {
    ipcRenderer.send('lobby-starts-meeting')
    history.push('/waiting')
  }

  return (
    <div className={styles.wrapper}>
      <h1>Unirse a reunión</h1>
      <button onClick={handleStartMeeting}>Entrar →</button>
    </div>
  )
}

export default LobbyRoute
