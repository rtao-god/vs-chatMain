import styles from './StatisticsCard.module.scss'
import GainUpIcon from '@/components/common/icons/GainUp'
import GainDownIcon from '@/components/common/icons/GainDown'
import classNames from 'classnames'
import { createElement } from 'react'

interface StatisticsCardProps {
  label: string
  timespan?: string
  amount: string
  gainPercent: number
  icon: React.FunctionComponent<any>
}

export default function StatisticsCard({ label, timespan, amount, gainPercent, icon }: StatisticsCardProps) {
  const displayedGainPercent = `${gainPercent > 0 ? '+' : ''}${gainPercent}%`

  return (
    <div className={styles.root}>
      {createElement(icon, { className: styles.icon })}
      <div className={styles.info}>
        <div className={styles.top}>
          <span className={styles.label}>{label}</span>
          {timespan && <span className={styles.timespan}>{timespan}</span>}
          {gainPercent > 0 ? <GainUpIcon className={styles.gainIcon} /> : <GainDownIcon className={styles.gainIcon} />}
          <span className={classNames(styles.gain, gainPercent < 0 && styles.gainNegative)}>
            {displayedGainPercent}
          </span>
        </div>

        <div className={styles.amount}>{amount}</div>
      </div>
    </div>
  )
}
