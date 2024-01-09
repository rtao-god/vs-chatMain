import CheckIcon from '@/components/common/icons/Check'
import OperatorAnnualStatisticsTable from '../OperatorAnnualStatisticsTable/OperatorAnnualStatisticsTable'
import StatisticsCard from '../StatisticsCard/StatisticsCard'
import styles from './OperatorStatistics.module.scss'
import ChatIcon from '@/components/common/icons/Chat'

export default function OperatorStatistics() {
  const departmentStatistics = [
    {
      departmentName: 'Placeholder department 1',
      monthlyStatistics: [
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        null,
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
      ],
    },
    {
      departmentName: 'Placeholder department 2',
      monthlyStatistics: [
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
        { success: 10, failure: 1 },
      ],
    },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.cardsWrap}>
        <StatisticsCard icon={CheckIcon} label="Average chat reply with" timespan="Last 30 days" gainPercent={20.08} amount="3 min" />
        <StatisticsCard icon={ChatIcon} label="Average per day" gainPercent={-2.18} amount="29" />
      </div>

      <OperatorAnnualStatisticsTable departmentStatistics={departmentStatistics} />
    </div>
  )
}
