import classNames from 'classnames'
import styles from './VsAssignmentBadge.module.scss'

interface VsAssignmentBadgeProps {
  name: string
  count?: number
  className?: string
}

export default function VsAssignmentBadge({ name, count, className }: VsAssignmentBadgeProps) {
  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.name}>{name}</div>
      {typeof count === 'number' && <div className={styles.count}>{count}</div>}
    </div>
  )
}
