import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useZoomEvents from '../../hooks/useZoomEvents'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const WaitingRoute = () => {
  const history = useHistory()

  useEffect(() => {
    const joinMeetingErrorListener = () => {
      window.alert(
        'Error al unirse a la reunión. Es posible que los datos de acceso no sean correctos.'
      )
      ipcRenderer.send('relaunch-app')
    }
    ipcRenderer.on('join-meeting-error', joinMeetingErrorListener)
    return () => {
      ipcRenderer.removeListener('join-meeting-error', joinMeetingErrorListener)
    }
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
