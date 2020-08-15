import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import { version } from '../../../package.json'

import Field from './Field'
import styles from './index.module.css'

const { ipcRenderer, shell } = window.require('electron')
const openUrl = url => shell.openExternal(url)
const performUpdate = () => openUrl('https://github.com/desko27/zoomcommander/releases/latest')

const makeSetter = setter => {
  return e => setter(e.target.value)
}

function LobbyRoute () {
  const history = useHistory()
  const [isUpdateAvailable, setIsUpdateAvailable] = useState()
  const [errUpdateAvailable, setErrUpdateAvailable] = useState()
  const [fieldName, setFieldName] = useState('')
  const [fieldMeeting, setFieldMeeting] = useState('')
  const [fieldPassword, setFieldPassword] = useState('')

  // check for updates once at startup
  useEffect(() => {
    const githubApiLatestReleaseUrl =
      'https://api.github.com/repos/desko27/zoomcommander/releases/latest'
    const headers = new window.Headers({ Accept: 'application/vnd.github.v3+json' })

    window
      .fetch(githubApiLatestReleaseUrl, headers)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`GitHub API returned ${res.status} status code!`)
        }
        return res.json()
      })
      .then(latestRelease => {
        const { tag_name: tagName } = latestRelease
        if (tagName === `v${version}`) return // we're up to date!
        setIsUpdateAvailable(true)
      })
      .catch(err => {
        console.log(err)
        setErrUpdateAvailable(true)
      })
  }, [])

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
            v{version} beta
          </span>
          {isUpdateAvailable ? (
            <button
              className={styles.updateButton}
              onClick={performUpdate}
            >
              🎁 ¡Novedades!
            </button>
          ) : (
            !errUpdateAvailable
              ? <span className={styles.versionIsUpdated}>Estás actualizado</span>
              : (
                <span className={cx(styles.versionIsUpdated, styles.error)}>
                  Sin comprobar
                </span>
              )
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
