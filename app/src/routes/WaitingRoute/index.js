import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useZoomEvents from '../../hooks/useZoomEvents'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const WaitingRoute = () => {
  const history = useHistory()
  const { t } = useTranslation('waiting')

  useEffect(() => {
    const joinMeetingErrorListener = () => {
      window.alert(t('error'))
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
      <span>{t('joining')}</span>
    </div>
  )
}

export default WaitingRoute
