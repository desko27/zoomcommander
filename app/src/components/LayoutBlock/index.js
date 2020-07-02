import React from 'react'
import cx from 'classnames'

import SearchBar from '../SearchBar'

import styles from './index.module.css'

function LayoutBlock ({
  children,
  dontGrow,
  flexBasis,
  title,
  actionsNode,
  color = 'white',
  onSearchChange
}) {
  return (
    <div
      className={cx(styles.wrapper, dontGrow && styles.dontGrow)}
      style={{
        '--local-color': `var(--c-${color})`,
        flexBasis: flexBasis && `${flexBasis}%`
      }}
    >
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.actions}>{actionsNode}</span>
      </div>
      <div className={styles.block}>
        {onSearchChange && <SearchBar onChange={onSearchChange} />}
        <div className={styles.users}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default LayoutBlock
