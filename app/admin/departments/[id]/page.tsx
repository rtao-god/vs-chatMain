import DepartmentsApi from '@/api/admin/DepartmentsApi'
import StaffApi from '@/api/admin/StaffApi'
import DepartmentEditor from '@/components/admin/departments/DepartmentEditor/DepartmentEditor'
import VsBackLink from '@/components/common/controls/VsBackLink/VsBackLink'
import { loadBulk } from '@/hooks/common/api'
import { useApiServerSide } from '@/hooks/common/api.server'
import { Department } from '@/interfaces/api/admin/department'
import { StaffMember } from '@/interfaces/api/admin/staff'
import styles from './page.module.scss'

interface DepartmentPageProps {
  params: { id: string }
}

interface DepartmentPageData {
  operators: StaffMember[],
  department: Department;
}

async function DepartmentPage({ params }: DepartmentPageProps) {
  const staffApi = useApiServerSide(StaffApi)
  const departmentsApi = useApiServerSide(DepartmentsApi)
  const pageData = await loadBulk<DepartmentPageData>({
    operators: staffApi.fetchStaffMemberList(),
    department: departmentsApi.fetchDepartment(params.id)
  })

  return (
    <main className={styles.root}>
      <section className={styles.actions}>
        <VsBackLink href="/admin/departments" label="Booking department" />
      </section>

      <h1 className={styles.heading}>Department information</h1>

      <DepartmentEditor operators={pageData.operators} department={pageData.department}/>
    </main>
  )
}

export default DepartmentPage
