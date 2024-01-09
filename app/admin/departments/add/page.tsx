import DepartmentEditor from '@/components/admin/departments/DepartmentEditor/DepartmentEditor'
import VsBackLink from '@/components/common/controls/VsBackLink/VsBackLink'
import styles from './page.module.scss'
import StaffApi from '@/api/admin/StaffApi'
import { useApiServerSide } from '@/hooks/common/api.server'

export default async function DepartmentAddPage() {
  const staffApi = useApiServerSide(StaffApi)
  const operators = await staffApi.fetchStaffMemberList()

  return (
    <main className={styles.root}>

      <section className={styles.actions}>
        <VsBackLink href="/admin/departments" label="Booking department" />
      </section>

      <h1 className={styles.heading}>Department information</h1>

      <DepartmentEditor operators={operators}/>
    </main>
  )
}
