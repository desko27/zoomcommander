import React from 'react'
import cx from 'classnames'

import { ReactComponent as XCircleIcon } from './icons/x-circle.svg'

import styles from './index.module.css'

function SearchBar ({ onChange, value, reset }) {
  return (
    <div className={styles.wrapper}>
      <input
        className={cx(styles.input, !!value && styles.hasValue)}
        placeholder='Filtrar usuarios...'
        onChange={onChange}
        value={value}
      />
      {!!value && (
        <button className={styles.resetButton} onClick={reset}>
          <XCircleIcon />
        </button>
      )}
    </div>
  )
}

export default SearchBar
