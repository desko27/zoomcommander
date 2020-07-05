import React, { useContext, useState } from 'react'
import KeyPressedContext from '../../context/KeyPressed/context'

import DumbCard from './DumbCard'

const UserItem = ({
  id,
  color,
  isGhost,
  nameColor,
  isAudioMuted,
  userName = '',
  actionsRef
}) => {
  const [isHover, setIsHover] = useState()
  const keyPressed = useContext(KeyPressedContext)

  return (
    <DumbCard
      id={id}
      color={color}
      isGhost={isGhost}
      nameColor={nameColor}
      isAudioMuted={isAudioMuted}
      userName={userName}
      actionsRef={actionsRef}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      isHover={isHover}
      keyPressed={keyPressed}
    />
  )
}

export default UserItem
