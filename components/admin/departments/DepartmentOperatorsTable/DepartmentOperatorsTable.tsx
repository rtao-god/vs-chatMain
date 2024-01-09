import VsSelect from '@/components/common/controls/VsSelect/VsSelect'
import TrashIcon from '@/components/common/icons/TrashIcon'
import { DepartmentOperator } from '@/interfaces/api/admin/department'
import classNames from 'classnames'
import styles from './DepartmentOperatorsTable.module.scss'
import { generateNumericOptions } from '@/utils/options'

interface DepartmentOperatorsTableProps {
  operatorList: DepartmentOperator[]
  onChangeOperatorPriority: (operatorId: number, value: number) => void
  onOperatorDeselect: (operatorId: number) => void
}

function DepartmentOperatorsTable({
  operatorList,
  onChangeOperatorPriority,
  onOperatorDeselect,
}: DepartmentOperatorsTableProps) {
  const priorityOptions = generateNumericOptions(operatorList.length)

  return (
    <section className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderCell}>Operator</div>
        <div className={styles.tableHeaderCell}>Level</div>
        <div className={styles.tableHeaderCell}></div>
      </div>

      <div className={styles.tableRowList}>
        {operatorList.map(operator => (
          <div className={styles.tableRow} key={operator.id}>
            <div className={classNames(styles.tableCell, styles.tableCellName)}>{operator.name}</div>

            <div className={classNames(styles.tableCell, styles.tableCellDepartments)}>
              <VsSelect
                className={styles.prioritySelect}
                options={priorityOptions}
                value={operator.priority}
                onChange={option => onChangeOperatorPriority(operator.id, option.value)}
              />
            </div>

            <div className={classNames(styles.tableCell, styles.actionCell)}>
              <span className={styles.trashButton} onClick={() => onOperatorDeselect(operator.id)}>
                <TrashIcon />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DepartmentOperatorsTable
