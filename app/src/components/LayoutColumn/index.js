import React from 'react'

import styles from './index.module.css'

const LayoutColumn = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  )
}

export default LayoutColumn
