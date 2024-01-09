import VsBackLink from '@/components/common/controls/VsBackLink/VsBackLink'
import styles from './page.module.scss'
import OperatorEditor from '@/components/admin/operators/OperatorEditor/OperatorEditor'
import { getInitialStaffMember } from '@/utils/factories/admin'
import DepartmentsApi from '@/api/admin/DepartmentsApi'
import { useApiServerSide } from '@/hooks/common/api.server'

export default async function OperatorAddPage() {
  const departmentsApi = useApiServerSide(DepartmentsApi)
  const operator = getInitialStaffMember()
  const departmentList = await departmentsApi.fetchDepartmentList()

  return (
    <main className={styles.root}>
      <VsBackLink className={styles.back} href="/admin/operators" label="Operators" />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Personal information</div>
        <OperatorEditor initialOperator={operator} availableDepartmentList={departmentList} isNewOperator />
      </section>
    </main>
  )
}
