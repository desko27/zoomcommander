import React from 'react'
import cx from 'classnames'
import { Droppable } from 'react-beautiful-dnd'

import SearchBar from '../SearchBar'

import styles from './index.module.css'

function LayoutBlock ({
  id,
  children,
  dontGrow,
  flexBasis,
  title,
  actionsNode,
  color = 'white',
  onSearchChange,
  searchValue = '',
  searchReset = () => {},
  isDroppable
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
        {onSearchChange && (
          <SearchBar
            onChange={onSearchChange}
            value={searchValue}
            reset={searchReset}
          />
        )}
        {isDroppable ? (
          <Droppable droppableId={id}>
            {provided => (
              <div
                className={styles.users}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {children}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <div className={styles.users}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default LayoutBlock
