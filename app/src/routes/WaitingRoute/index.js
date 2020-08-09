import React from 'react'
import { useHistory } from 'react-router-dom'

import useZoomEvents from '../../hooks/useZoomEvents'

import styles from './index.module.css'

const WaitingRoute = () => {
  const history = useHistory()

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
