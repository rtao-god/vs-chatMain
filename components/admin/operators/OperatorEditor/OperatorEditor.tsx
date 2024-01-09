'use client'

import { NewStaffMember, StaffMember, StaffMemberDepartment } from '@/interfaces/api/admin/staff'
import styles from './OperatorEditor.module.scss'
import VsInput from '@/components/common/controls/VsInput/VsInput'
import VsInlineMultiselect from '@/components/common/controls/VsInlineMultiselect/VsInlineMultiselect'
import OperatorDepartmentsTable from '../OperatorDepartmentsTable/OperatorDepartmentsTable'
import AvatarUploader from '../AvatarUploader/AvatarUploader'
import { Department } from '@/interfaces/api/admin/department'
import { mapOptions } from '@/utils/options'
import { useForm } from '@/hooks/common/useForm'
import FormActions from '../../FormActions/FormActions'
import { useApiClientSide } from '@/hooks/common/api.client'
import StaffApi from '@/api/admin/StaffApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PayloadError } from '@/api/base/errors'

interface OperatorEditorProps {
  initialOperator: NewStaffMember | StaffMember
  availableDepartmentList: Department[]
  isNewOperator?: boolean
}

export default function OperatorEditor({ initialOperator, availableDepartmentList, isNewOperator }: OperatorEditorProps) {
  const router = useRouter()
  const staffApi = useApiClientSide(StaffApi)

  const [isSaving, setIsSaving] = useState(false)
  const form = useForm({
    initialFieldValues: initialOperator,
    onSubmit: async operator => {
      setIsSaving(true)

      try {
        if ('id' in initialOperator) {
          await staffApi.updateStaffMember(operator as StaffMember)
        } else {
          await staffApi.createStaffMember(operator)
        }

        router.push('/admin/operators')
      } catch (error: unknown) {
        if (error instanceof PayloadError) {
          form.onSubmitError(error)
        }

        setIsSaving(false)
      }
    },
  })

  const departmentOptions = mapOptions(availableDepartmentList, 'name')
  const operatorDepartments = availableDepartmentList.filter(availableDepartment =>
    form.state.departments.some(operatorDepartment => operatorDepartment.id === availableDepartment.id)
  )

  const onOperatorDepartmentSelect = (department: Department) => {
    const newOperatorDepartments = [...form.state.departments]
    newOperatorDepartments.push({ id: department.id, name: department.name, priority: 1 })
    form.setFieldValue('departments', newOperatorDepartments)
  }

  const onOperatorDepartmentDeselect = (department: Department | StaffMemberDepartment) => {
    const newOperatorDepartments = form.state.departments.filter(
      operatorDepartment => operatorDepartment.id !== department.id
    )
    form.setFieldValue('departments', newOperatorDepartments)
  }

  const onOperatorPriorityChange = (department: StaffMemberDepartment, newPriority: number) => {
    const newOperatorDepartments = [...form.state.departments]
    const operatorDepartment = newOperatorDepartments.find(
      operatorDepartment => operatorDepartment.id === department.id
    )!
    operatorDepartment.priority = newPriority
    form.setFieldValue('departments', newOperatorDepartments)
  }

  const initialAvatarUrl = initialOperator.image
    ? process.env.NEXT_PUBLIC_BASE_AVATAR_URL + '/' + initialOperator.image
    : null

  const passwordInputLabel = isNewOperator ? 'Password' : 'New password'

  return (
    <div className={styles.root}>
      <div className={styles.photoSelectorWrap}>
        <AvatarUploader initialAvatarUrl={initialAvatarUrl} onChange={image => form.setFieldValue('image', image)} />
      </div>

      <div className={styles.fields}>
        <VsInput
          className={styles.nameInput}
          label="Operator name"
          value={form.state.name}
          errorMessage={form.fieldErrorByName.name}
          onInput={name => form.setFieldValue('name', name)}
        />

        <VsInput
          className={styles.emailInput}
          label="Email"
          name="email"
          type="email"
          value={form.state.email}
          errorMessage={form.fieldErrorByName.email}
          onInput={email => form.setFieldValue('email', email)}
        />

        <VsInput
          className={styles.passwordInput}
          label={passwordInputLabel}
          name="password"
          type="password"
          value={form.state.password}
          errorMessage={form.fieldErrorByName.password}
          onInput={password => form.setFieldValue('password', password)}
          autoComplete="new-password"
        />

        <VsInlineMultiselect
          className={styles.departmentsSelect}
          options={departmentOptions}
          selectedValues={operatorDepartments}
          onSelect={onOperatorDepartmentSelect}
          onDeselect={onOperatorDepartmentDeselect}
        />

        <OperatorDepartmentsTable
          operator={initialOperator}
          availableDepartments={availableDepartmentList}
          departments={form.state.departments}
          onDeselect={onOperatorDepartmentDeselect}
          onOperatorPriorityChange={onOperatorPriorityChange}
        />
      </div>

      <FormActions
        isShown={form.hasBeenEdited}
        isDisabled={isSaving}
        cancelHref="/admin/operators"
        onSave={form.onSubmit}
      />
    </div>
  )
}
