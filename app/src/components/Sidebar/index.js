import React, { useEffect, useState } from 'react'
import vex from 'vex-js'

import sendZoomCommand from '../../common/sendZoomCommand'
import useShortcuts from '../../hooks/useShortcuts'

// import { ReactComponent as ColumnsIcon } from './icons/columns.svg'
import { ReactComponent as LogInIcon } from './icons/log-in.svg'
import { ReactComponent as LogOutIcon } from './icons/log-out.svg'
import { ReactComponent as RadioIcon } from './icons/radio.svg'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const navOs = navigator.platform.toLowerCase()
const isMac = navOs.startsWith('mac')

function Sidebar ({ startMeeting, toggleHostsBlock }) {
  const [appShare, setAppShare] = useState(isMac ? 'mediaportal.app' : 'mediaportal.exe')
  const [windowShare, setWindowShare] = useState('Portal')

  useEffect(() => {
    // load existing setting for appShare
    const loadAppShareSetting = async () => {
      const sharingSetting = await ipcRenderer.invoke('get-setting', 'sharing')
      if (!sharingSetting) return
      const { app, windowTitle } = sharingSetting
      setAppShare(app)
      setWindowShare(windowTitle)
    }
    // call async func
    loadAppShareSetting()
  }, [])

  const handleStartShareClick = async () => {
    const appNotFound = () => window.alert(`No se encuentra '${appShare}'`)
    const appWindows = await ipcRenderer.invoke('request-windows-list', appShare)
    if (!(appWindows || {}).length) return appNotFound()
    const { id } = windowShare
      ? appWindows.find(({ title }) => title === windowShare) || {}
      : appWindows[0] || {}
    if (!id) return appNotFound()
    const prepareId = id => isMac ? id : id.toString(16) // windows needs hex
    sendZoomCommand('startAppShare', `${prepareId(id)}`)
  }

  const handleStartShareConfigClick = () => {
    vex.dialog.prompt({
      message: `¿Qué aplicación y ventana deben compartirse siempre? Introduce
esta información en el siguiente formato: aplicación.exe/título de ventana`,
      callback: value => {
        if (value === false) return // cancel, original value is kept
        const [app, windowTitle] = value.split('/')
        setAppShare(app)
        setWindowShare(windowTitle)
        ipcRenderer.invoke('set-setting', 'sharing', { app, windowTitle })
      },
      value: windowShare ? `${appShare}/${windowShare}` : appShare
    })
  }

  const handleStopShareClick = async () => {
    sendZoomCommand('stopShare')
  }

  useShortcuts({
    startAppShare: handleStartShareClick,
    stopShare: handleStopShareClick
  }, [appShare, windowShare])

  /**
   * Hosts Block is disabled by now.
   */
  // const renderToggleHostsBlock = () => (
  //   <button
  //     className={styles.button}
  //     style={{ background: 'var(--c-error)' }}
  //     onClick={toggleHostBlock}
  //   >
  //     <ColumnsIcon />
  //   </button>
  // )

  return (
    <div className={styles.wrapper}>
      <div>
        <button
          className={styles.button}
          style={{ background: 'var(--c-primary)' }}
          onClick={startMeeting}
        >
          <LogInIcon />
        </button>
        {/* renderToggleHostsBlock() */}
      </div>
      <div>
        <button
          className={styles.button}
          style={{ background: 'var(--c-success)' }}
          onClick={handleStartShareClick}
          onAuxClick={handleStartShareConfigClick}
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
      <button
        className={styles.button}
        style={{ background: 'var(--c-error)' }}
        disabled
      >
        <LogOutIcon />
      </button>
    </div>
  )
}

export default Sidebar
