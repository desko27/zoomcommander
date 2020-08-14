import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Field from './Field'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const makeSetter = setter => {
  return e => setter(e.target.value)
}

function LobbyRoute () {
  const history = useHistory()
  const [hasUpdate, setHasUpdate] = useState() // eslint-disable-line
  const [fieldName, setFieldName] = useState('')
  const [fieldMeeting, setFieldMeeting] = useState('')
  const [fieldPassword, setFieldPassword] = useState('')

  useEffect(() => {
    // load existing settings
    const lobbySettingsListener = (event, payload = {}) => {
      const { username, meetingID, meetingPassword } = payload
      if (username) setFieldName(username)
      if (meetingID) setFieldMeeting(meetingID)
      if (meetingPassword) setFieldPassword(meetingPassword)
    }
    ipcRenderer.on('load-lobby-settings', lobbySettingsListener)
    return () => {
      ipcRenderer.removeListener('load-lobby-settings', lobbySettingsListener)
    }
  }, [])

  useLayoutEffect(() => {
    ipcRenderer.send('main-window-ready')
  }, [])

  const handleStartMeeting = () => {
    ipcRenderer.send('lobby-starts-meeting', {
      username: fieldName,
      meetingID: fieldMeeting.replace(/ /g, ''),
      meetingPassword: fieldPassword
    })
    history.push('/waiting')
  }

  return (
    <form className={styles.wrapper} onSubmit={handleStartMeeting}>
      <h1 className={styles.title}>Unirse a reunión</h1>
      <div className={styles.fields}>
        <Field
          label='Nombre'
          color='primary'
          value={fieldName}
          onChange={makeSetter(setFieldName)}
        />
        <Field
          label='ID de reunión'
          color='primary'
          value={fieldMeeting}
          onChange={makeSetter(setFieldMeeting)}
        />
        <Field
          label='Contraseña'
          color='primary'
          value={fieldPassword}
          onChange={makeSetter(setFieldPassword)}
        />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.versionColumn}>
          <span className={styles.version}>
            v1.0.0 beta
          </span>
          {hasUpdate ? (
            <button
              className={styles.updateButton}
              onClick={() => {}}
            >
              🎁 ¡Novedades!
            </button>
          ) : (
            <span className={styles.versionIsUpdated}>Estás actualizado</span>
          )}
        </div>
        <button
          className={styles.goButton}
          disabled={!(fieldName && fieldMeeting)}
          type='submit'
        >
          Entrar →
        </button>
      </div>
    </form>
  )
}

export default LobbyRoute
