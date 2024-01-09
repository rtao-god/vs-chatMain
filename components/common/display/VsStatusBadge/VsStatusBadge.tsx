import { capitalize } from '@/utils/strings'
import styles from './VsStatusBadge.module.scss'
import classNames from 'classnames'

type VsBadgeType = 'inactive' | 'active' | 'processing' 

interface VsBadgeProps {
  name: string
  type?: VsBadgeType
}

export default function VsStatusBadge({ name, type = 'inactive' }: VsBadgeProps) {
  return (
    <div className={classNames(styles.root, styles['root' + capitalize(type)])}>
      <div className={classNames(styles.name)}>{name}</div>
    </div>
  )
}
