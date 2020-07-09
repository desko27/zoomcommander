import React, { useContext, useState } from 'react'
import cx from 'classnames'
import { Draggable } from 'react-beautiful-dnd'
import KeyPressedContext from '../../context/KeyPressed/context'

import DumbCard from './DumbCard'
import styles from './index.module.css'

const UserItem = ({
  id,
  index,
  color,
  isGhost,
  nameColor,
  isAudioMuted,
  userName = '',
  notes,
  actionsRef,
  isDraggable,
  groupId = 'common',
  updateUserData
}) => {
  const [isHover, setIsHover] = useState()
  const keyPressed = useContext(KeyPressedContext)

  const dumbCardProps = {
    id,
    color,
    isGhost,
    nameColor,
    isAudioMuted,
    userName,
    notes,
    actionsRef,
    onMouseEnter: () => setIsHover(true),
    onMouseLeave: () => setIsHover(false),
    isHover,
    keyPressed,
    updateUserData
  }

  if (isDraggable) {
    return (
      <Draggable
        draggableId={`${groupId}.${id}`}
        index={index}
        disableInteractiveElementBlocking
      >
        {(provided, snapshot) => (
          <div
            className={cx(styles.wrapper, snapshot.isDragging && styles.isDragging)}
            ref={provided && provided.innerRef}
            {...provided ? provided.draggableProps : {}}
            {...provided ? provided.dragHandleProps : {}}
          >
            <DumbCard
              {...dumbCardProps}
              isDragging={snapshot.isDragging}
            />
          </div>
        )}
      </Draggable>
    )
  }

  return (
    <div className={styles.wrapper}>
      <DumbCard {...dumbCardProps} />
    </div>
  )
}

export default UserItem
