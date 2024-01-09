import AdminNavbar from '@/components/admin/AdminNavbar/AdminNavbar'
import styles from './page.module.scss'
import DepartmentsTable from '@/components/admin/departments/DepartmentsTable/DepartmentsTable'
import DepartmentsApi from '@/api/admin/DepartmentsApi'
import VsLink from '@/components/common/controls/VsLink/VsLink'
import { useApiServerSide } from '@/hooks/common/api.server'

export default async function DepartmentsPage() {
  const departmentsApi = useApiServerSide(DepartmentsApi)
  const departmentList = await departmentsApi.fetchDepartmentList()

  return (
    <main className={styles.root}>
      <AdminNavbar className={styles.navbar} />

      <section className={styles.actions}>
        <VsLink href="/admin/departments/add" className={styles.addLink}>
          Add new department
        </VsLink>
      </section>

      <DepartmentsTable departmentList={departmentList} />
    </main>
  )
}
