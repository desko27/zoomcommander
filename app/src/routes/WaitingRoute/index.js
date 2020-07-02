import React, { useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useZoomEvents from '../../hooks/useZoomEvents'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const WaitingRoute = () => {
  const history = useHistory()

  useLayoutEffect(() => {
    ipcRenderer.send('main-window-ready')
  }, [])

  useZoomEvents({
    MEETING_JOINED: () => {
      // navigate to the main route
      history.push('/main')
    }
  })

  return (
    <div className={styles.wrapper}>
      <span>Entrando en la reunión...</span>
    </div>
  )
}

export default WaitingRoute
