import classNames from 'classnames'
import styles from './OperatorDepartmentsTable.module.scss'
import DeleteIcon from '@/components/common/icons/Delete'
import VsSelect from '@/components/common/controls/VsSelect/VsSelect'
import { NewStaffMember, StaffMember, StaffMemberDepartment } from '@/interfaces/api/admin/staff'
import { Department } from '@/interfaces/api/admin/department'
import { useMemo } from 'react'
import { mapBy } from '@/utils/misc'
import { Option } from '@/interfaces/common/options'
import { generateNumericOptions, mapOptions } from '@/utils/options'

interface OperatorDepartmentsTableProps {
  operator: StaffMember | NewStaffMember
  availableDepartments: Department[]
  departments: StaffMemberDepartment[]
  onDeselect?: (department: StaffMemberDepartment) => void
  onOperatorPriorityChange?: (department: StaffMemberDepartment, newPriority: number) => void
}

export default function OperatorDepartmentsTable({
  operator,
  availableDepartments,
  departments,
  onDeselect,
  onOperatorPriorityChange,
}: OperatorDepartmentsTableProps) {
  const priorityOptionsByDepartmentId = useMemo(() => {
    const priorityOptionsByDepartmentId = new Map<number, Option<number>[]>()

    for (const availableDepartment of availableDepartments) {
      let optionCount = availableDepartment.users.length + 1
      if ('id' in operator && availableDepartment.users.some(staffMember => operator.id === staffMember.id)) {
        optionCount--
      }

      priorityOptionsByDepartmentId.set(availableDepartment.id, generateNumericOptions(optionCount))
    }

    return priorityOptionsByDepartmentId
  }, [availableDepartments])

  return (
    <div className={styles.root}>
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderCell}>Department</div>
        <div className={styles.tableHeaderCell}>Level</div>
        <div className={styles.tableHeaderCell}></div>
      </div>
      <div className={styles.tableRowList}>
        {departments.map((department, index) => (
          <div className={styles.tableRow} key={index}>
            <div className={classNames(styles.tableCell, styles.tableCellName)}>{department.name}</div>
            <div className={styles.tableCell}>
              <VsSelect
                className={styles.prioritySelect}
                options={priorityOptionsByDepartmentId.get(department.id)!}
                value={department.priority}
                onChange={({ value }) => onOperatorPriorityChange?.(department, value)}
              />
            </div>
            <div className={styles.tableCell}>
              <button className={styles.deleteButton} onClick={() => onDeselect?.(department)}>
                <DeleteIcon className={styles.deleteButtonIcon} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
