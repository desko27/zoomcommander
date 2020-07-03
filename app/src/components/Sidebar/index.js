import React from 'react'

import sendZoomCommand from '../../common/sendZoomCommand'
import useShortcuts from '../../hooks/useShortcuts'

import { ReactComponent as RadioIcon } from './icons/radio.svg'
import { ReactComponent as LogInIcon } from './icons/log-in.svg'
import { ReactComponent as LogOutIcon } from './icons/log-out.svg'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

function Sidebar ({ startMeeting }) {
  const handleStartShareClick = async () => {
    const mediaportalNotFound = () => window.alert('No se encuentra Mediaportal')
    const mediaportalWindows = await ipcRenderer.invoke('request-windows-list', 'mediaportal.app')
    if (!(mediaportalWindows || {}).length) return mediaportalNotFound()
    const { id } = mediaportalWindows.find(({ title }) => title === 'Portal')
    if (!id) return mediaportalNotFound()
    sendZoomCommand('startAppShare', `${id}`)
  }

  const handleStopShareClick = async () => {
    sendZoomCommand('stopShare')
  }

  useShortcuts({
    startAppShare: handleStartShareClick,
    stopShare: handleStopShareClick
  })

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        style={{ background: 'var(--c-primary)' }}
        onClick={startMeeting}
      >
        <LogInIcon />
      </button>
      <div>
        <button
          className={styles.button}
          style={{ background: 'var(--c-success)' }}
          onClick={handleStartShareClick}
        >
          <RadioIcon />
        </button>
        <button
          className={styles.button}
          style={{ background: 'var(--c-error)' }}
          onClick={handleStopShareClick}
        >
          <RadioIcon />
        </button>
      </div>
      <button className={styles.button} style={{ background: 'var(--c-error)' }}>
        <LogOutIcon />
      </button>
    </div>
  )
}

export default Sidebar
