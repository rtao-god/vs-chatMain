'use client'
import DepartmentsApi from '@/api/admin/DepartmentsApi'
import VsButton from '@/components/common/controls/VsButton/VsButton'
import VsInlineMultiselect from '@/components/common/controls/VsInlineMultiselect/VsInlineMultiselect'
import VsInput from '@/components/common/controls/VsInput/VsInput'
import { useApiClientSide } from '@/hooks/common/api.client'
import { FormError, useForm } from '@/hooks/common/useForm'
import { Department, DepartmentFormData, DepartmentOperator } from '@/interfaces/api/admin/department'
import { StaffMember } from '@/interfaces/api/admin/staff'
import { useMemo, useState } from 'react'
import DepartmentActions from '../DepartmentActions/DepartmentActions'
import DepartmentOperatorsTable from '../DepartmentOperatorsTable/DepartmentOperatorsTable'
import styles from './DepartmentEditor.module.scss'
import { useRouter } from 'next/navigation'
import { PayloadError } from '@/api/base/errors'

interface DepartmentEditorProps {
  operators: StaffMember[]
  department?: Department
}

function DepartmentEditor({ operators, department }: DepartmentEditorProps) {
  const router = useRouter()
  const departmentsApi = useApiClientSide(DepartmentsApi)
  const isDepartmentEditMode = !!department
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<DepartmentFormData>({
    initialFieldValues: {
      name: department?.name || '',
      operators: department?.users || [],
    },
    onSubmit: async fieldValues => {
      setIsSaving(true)
      try {
        if (isDepartmentEditMode) {
          await departmentsApi.updateDepartment(
            {
              image: '',
              name: fieldValues.name,
              users: fieldValues.operators,
            },
            department.id
          )
        } else {
          await departmentsApi.createDepartment({
            image: '',
            name: fieldValues.name,
            users: fieldValues.operators,
          })
        }
        router.push('/admin/departments')
      } catch (error: unknown) {
        if (error instanceof PayloadError) {
          form.onSubmitError(error)
        }

        setIsSaving(false)
      }
    },
    onValidate: fieldValues => {
      const errors = {} as FormError<DepartmentFormData>

      if (fieldValues.name?.length < 3) {
        errors.name = "Department name can't be shorter than 3 characters"
      }

      return errors
    },
  })

  function onDepartmentOperatorsChange(selectedOperatorIds: number[]) {
    const newDepartmentOperatorList: DepartmentOperator[] = []
    selectedOperatorIds.forEach(selectedOperatorId => {
      const fullListSelectedOperatorIndex = operators.findIndex(operator => operator.id === selectedOperatorId)
      const currentSelectedOperatorIndex = form.state.operators.findIndex(
        operator => operator.id === selectedOperatorId
      )

      if (fullListSelectedOperatorIndex === -1) return
      if (currentSelectedOperatorIndex > -1) {
        newDepartmentOperatorList.push(form.state.operators[currentSelectedOperatorIndex])
      } else {
        const { name: selectedOperatorName } = operators[fullListSelectedOperatorIndex]
        newDepartmentOperatorList.push({ id: selectedOperatorId, name: selectedOperatorName, priority: 1 })
      }
    })
    form.setFieldValue('operators', newDepartmentOperatorList)
  }

  function onOperatorPriorityChange(operatorId: number, priority: number) {
    const newDepartmentOperators = [...form.state.operators]
    const departmentOperatorIdx = newDepartmentOperators.findIndex(el => el.id === operatorId)
    if (departmentOperatorIdx !== -1) newDepartmentOperators[departmentOperatorIdx].priority = priority
    form.setFieldValue('operators', newDepartmentOperators)
  }

  function onOperatorDeselect(deselectedOperatorId: number) {
    const newDepartmentOperators = form.state.operators.filter(operator => operator.id !== deselectedOperatorId)
    const newDepartmentOperatorAmount = newDepartmentOperators.length

    //normalize operator priorities after operator deselection
    newDepartmentOperators.forEach(newDepartmentOperator => {
      if (newDepartmentOperator.priority >= newDepartmentOperatorAmount) {
        newDepartmentOperator.priority = newDepartmentOperatorAmount - 1
      }
    })

    //update operators array
    form.setFieldValue('operators', newDepartmentOperators)
  }

  const operatorsMultiselectOptions = useMemo(
    () => operators.map(operator => ({ name: operator.name, value: operator.id! })),
    [operators]
  )

  const departmentOperatorIds = form.state.operators.map(operator => operator.id) || []

  return (
    <div className={styles.root}>
      <DepartmentActions departmentId={department?.id as number} />
      <section className={styles.textInputContainer}>
        <VsInput
          name="name"
          label="Department name"
          placeholder="Booking department"
          className={styles.textInput}
          value={form.state.name}
          errorMessage={form.isFieldTouchedByName.name && form.fieldErrorByName.name}
          onInput={newName => form.setFieldValue('name', newName)}
          onBlur={form.onBlur}
        />
      </section>

      <section className={styles.selectInput}>
        <VsInlineMultiselect
          options={operatorsMultiselectOptions}
          selectedValues={departmentOperatorIds}
          onChange={onDepartmentOperatorsChange}
        />
      </section>

      <DepartmentOperatorsTable
        operatorList={form.state.operators}
        onChangeOperatorPriority={onOperatorPriorityChange}
        onOperatorDeselect={onOperatorDeselect}
      />

      <section className={styles.formFooter}>
        <VsButton className={styles.saveButton} onClick={form.onSubmit} isDisabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </VsButton>
      </section>
    </div>
  )
}

export default DepartmentEditor
