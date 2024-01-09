import VsAssignmentBadge from '@/components/common/display/VsAssignmentBadge/VsAssignmentBadge'
import classNames from 'classnames'
import VsStatusBadge from '@/components/common/display/VsStatusBadge/VsStatusBadge'
import VsMoreLink from '@/components/common/controls/VsMoreLink/VsMoreLink'
import styles from './OperatorsTable.module.scss'
import VsButton from '@/components/common/controls/VsButton/VsButton'
import { StaffMember } from '@/interfaces/api/admin/staff'

interface OperatorsTableProps {
  operatorList: StaffMember[]
}

export default function OperatorsTable({ operatorList }: OperatorsTableProps) {
  return (
    <section className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderCell}>Operator</div>
        <div className={styles.tableHeaderCell}>Department / level</div>
        <div className={styles.tableHeaderCell}>Chat</div>
        <div className={styles.tableHeaderCell}>View</div>
        <div className={styles.tableHeaderCell}></div>
      </div>

      <div className={styles.tableRowList}>
        {operatorList.map(operator => (
          <div className={styles.tableRow}>
            <div className={classNames(styles.tableCell, styles.tableCellName)}>{operator.name}</div>

            <div className={classNames(styles.tableCell, styles.tableCellDepartments)}>
              <div className={styles.departmentsWrap}>
                {operator.departments.map(operatorDepartment => (
                  <VsAssignmentBadge
                    key={`${operator.id}-${operatorDepartment.id}`}
                    className={styles.deparmentBadge}
                    name={operatorDepartment.name}
                    count={operatorDepartment.priority}
                  />
                ))}
              </div>
            </div>

            <div className={classNames(styles.tableCell)}>
              <VsStatusBadge name="placeholder" type="processing" />
            </div>

            <div className={styles.tableCell}>
              <VsButton className={styles.viewChat} size="small">
                Chat
              </VsButton>
            </div>

            <div className={styles.tableCell}>
              <VsMoreLink className={styles.moreLink} href={'/admin/operators/' + operator.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
