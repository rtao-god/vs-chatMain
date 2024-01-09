import VsAssignmentBadge from '@/components/common/display/VsAssignmentBadge/VsAssignmentBadge'
import VsMoreLink from '@/components/common/controls/VsMoreLink/VsMoreLink'
import { Department } from '@/interfaces/api/admin/department'
import classNames from 'classnames'
import styles from './DepartmentsTable.module.scss'

interface DepartmentsTableProps {
  departmentList: Department[]
}

export default function DepartmentsTable({ departmentList }: DepartmentsTableProps) {
  return (
    <section className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderCell}>Department</div>
        <div className={styles.tableHeaderCell}>Operator</div>
        <div className={styles.tableHeaderCell}></div>
      </div>

      <div className={styles.tableRowList}>
        {departmentList.map(department => (
          <div className={styles.tableRow} key={department.id}>
            <div className={classNames(styles.tableCell, styles.tableCellName)}>{department.name}</div>

            <div className={classNames(styles.tableCell, styles.tableCellDepartments)}>
              <div className={styles.departmentsWrap}>
                <VsAssignmentBadge className={styles.deparmentBadge} name="placeholder" count={1} />
              </div>
            </div>

            <div className={classNames(styles.tableCell, styles.linkCell)}>
              <VsMoreLink href={'/admin/departments/' + department.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
