import DepartmentsApi from '@/api/admin/DepartmentsApi'
import VsButton from '@/components/common/controls/VsButton/VsButton'
import VsConfirmModal from '@/components/common/display/VsConfirmModal/VsConfirmModal'
import { useApiClientSide } from '@/hooks/common/api.client'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './DepartmentActions.module.scss'

interface DepartmentActionsProps {
  departmentId: number | string
  className?: string
}

function DepartmentActions({ departmentId, className }: DepartmentActionsProps) {
  const departmentsApi = useApiClientSide(DepartmentsApi)
  const router = useRouter()
  const [isDeletionConfirmOpen, setIsDeletionConfirmOpen] = useState<boolean>(false)

  const [isDeleting, setIsDeleting] = useState(false)

  const onDelete = async () => {
    setIsDeleting(true)

    try {
      await departmentsApi.deleteDepartment(departmentId)
      router.push('/admin/departments')
    } catch {
      setIsDeleting(false)
    }
  }

  const onClickDeleteButton = () => {
    setIsDeletionConfirmOpen(true)
  }

  return (
    <div className={classNames(styles.root, className)}>
      <VsButton className={styles.deleteButton} type="danger" onClick={onClickDeleteButton}>
        Delete department
      </VsButton>

      {isDeletionConfirmOpen && (
        <VsConfirmModal
          isLoading={isDeleting}
          onClose={() => setIsDeletionConfirmOpen(false)}
          onConfirm={onDelete}
          bodyText="You will delete the department"
        />
      )}
    </div>
  )
}

export default DepartmentActions
