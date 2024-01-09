import VsBackLink from '@/components/common/controls/VsBackLink/VsBackLink'
import styles from './page.module.scss'
import OperatorEditor from '@/components/admin/operators/OperatorEditor/OperatorEditor'
import OperatorStatistics from '@/components/admin/operators/OperatorStatistics/OperatorStatistics'
import OperatorChats from '@/components/admin/operators/OperatorChats/OperatorChats'
import { StaffMember } from '@/interfaces/api/admin/staff'
import { Department } from '@/interfaces/api/admin/department'
import { loadBulk } from '@/hooks/common/api'
import StaffApi from '@/api/admin/StaffApi'
import DepartmentsApi from '@/api/admin/DepartmentsApi'
import { useApiServerSide } from '@/hooks/common/api.server'
import { OperatorActions } from '@/components/admin/operators/OperatorActions/OperatorActions'

interface OperatorPageProps {
  params: { id: string }
}

interface OperatorPageData {
  operator: StaffMember
  departmentList: Department[]
}

export default async function OperatorPage({ params }: OperatorPageProps) {
  const staffApi = useApiServerSide(StaffApi)
  const departmentsApi = useApiServerSide(DepartmentsApi)
  const pageData = await loadBulk<OperatorPageData>({
    operator: staffApi.fetchStaffMember(params.id),
    departmentList: departmentsApi.fetchDepartmentList(),
  })

  return (
    <main className={styles.root}>
      <div className={styles.actionsWrap}>
        <OperatorActions className={styles.actions} operatorId={params.id} />
      </div>

      <VsBackLink className={styles.back} href="/admin/operators" label="Operators" />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Personal information</div>
        <OperatorEditor initialOperator={pageData.operator} availableDepartmentList={pageData.departmentList} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Statistics</div>
        <OperatorStatistics />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>Chat</div>
        <OperatorChats />
      </section>
    </main>
  )
}
