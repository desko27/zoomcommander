import React from 'react'

import styles from './index.module.css'

function Field ({ label, value, onChange, color }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <input
        className={styles.input}
        style={{ color: `var(--c-${color})` }}
        type='text'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Field
