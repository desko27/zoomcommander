import React, { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Field from './Field'

import styles from './index.module.css'

const { ipcRenderer } = window.require('electron')

const makeSetter = setter => {
  return e => setter(e.target.value)
}

function LobbyRoute () {
  const history = useHistory()
  const [fieldName, setFieldName] = useState('')
  const [fieldMeeting, setFieldMeeting] = useState('')
  const [fieldPassword, setFieldPassword] = useState('')

  useLayoutEffect(() => {
    ipcRenderer.send('main-window-ready')
  }, [])

  const handleStartMeeting = () => {
    ipcRenderer.send('lobby-starts-meeting')
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
        <span className={styles.version}>
          v1.0.0 beta
        </span>
        <button
          className={styles.bottomButton}
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
