import React from 'react'

import { ReactComponent as AwardIcon } from './icons/award.svg'
import { ReactComponent as MicOffIcon } from './icons/mic-off.svg'
import { ReactComponent as MicIcon } from './icons/mic.svg'
import { ReactComponent as TargetIcon } from './icons/target.svg'
import { ReactComponent as UserPlusIcon } from './icons/user-plus.svg'
import { ReactComponent as UserXIcon } from './icons/user-x.svg'

import styles from './index.module.css'

const ICONS = {
  award: AwardIcon,
  'mic-off': MicOffIcon,
  mic: MicIcon,
  target: TargetIcon,
  'user-plus': UserPlusIcon,
  'user-x': UserXIcon
}

function UserAction ({ icon, color = 'white' }) {
  const IconComponent = ICONS[icon]
  return (
    <div className={styles.wrapper} style={{ background: `var(--c-${color})` }}>
      {<IconComponent />}
    </div>
  )
}

export default UserAction
