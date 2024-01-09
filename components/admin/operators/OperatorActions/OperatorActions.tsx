'use client'

import VsButton from '@/components/common/controls/VsButton/VsButton'
import styles from './OperatorActions.module.scss'
import { useApiClientSide } from '@/hooks/common/api.client'
import StaffApi from '@/api/admin/StaffApi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'

interface OperatorActionsProps {
  operatorId: number | string
  className?: string
}

export function OperatorActions({ operatorId, className }: OperatorActionsProps) {
  const staffApi = useApiClientSide(StaffApi)
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)
  const onDelete = async () => {
    setIsDeleting(true)

    try {
      await staffApi.deleteStaffMember(operatorId)
      router.push('/admin/operators')
    } catch {
      setIsDeleting(false)
    }
  }

  return (
    <div className={classNames(styles.root, className)}>
      <VsButton isDisabled={isDeleting} className={styles.deleteButton} type="danger" onClick={onDelete}>
        Delete operator
      </VsButton>
    </div>
  )
}
