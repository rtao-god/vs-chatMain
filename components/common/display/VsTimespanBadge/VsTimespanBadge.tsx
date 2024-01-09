import classNames from 'classnames'
import styles from './VsTimespanBadge.module.scss'

interface VsTimespanBadgeProps {
  className?: string
  timespan: string
}

export default function VsTimeBadge({ timespan, className }: VsTimespanBadgeProps) {
  return <div className={classNames(styles.root, className)}>{timespan}</div>
}
