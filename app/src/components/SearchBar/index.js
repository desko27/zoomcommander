import React from 'react'

import styles from './index.module.css'

function SearchBar ({ onChange }) {
  return (
    <input
      className={styles.wrapper}
      placeholder='Filtrar usuarios...'
      onChange={onChange}
      required
    />
  )
}

export default SearchBar
