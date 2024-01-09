import { AnnualDepartmentStatistics } from '@/interfaces/components/admin/operators'
import styles from './OperatorAnnualStatisticsTable.module.scss'
import classNames from 'classnames'

interface OperatorAnnualStatisticsTableProps {
  departmentStatistics: AnnualDepartmentStatistics[]
}

const MONTH_NAMES = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']

export default function OperatorAnnualStatisticsTable({ departmentStatistics }: OperatorAnnualStatisticsTableProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerCell}>Departments</div>
        {MONTH_NAMES.map(monthName => (
          <div className={styles.headerCell}>{monthName}</div>
        ))}
      </div>
      <div className={styles.rowList}>
        {departmentStatistics.map(({ departmentName, monthlyStatistics }) => (
          <div className={styles.row} key={departmentName}>
            <div className={classNames(styles.rowCell, styles.rowCellHeader)}>{departmentName}</div>
            {monthlyStatistics.map((monthlyStatisticsItem, index) => (
              <div className={styles.rowCell} key={departmentName + '-' + index}>
                {monthlyStatisticsItem ? (
                  <>
                    <span className={styles.successCount}>{monthlyStatisticsItem.success}</span>/
                    <span className={styles.failureCount}>{monthlyStatisticsItem.failure}</span>
                  </>
                ) : (
                  '-'
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
