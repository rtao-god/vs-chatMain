import AdminNavbar from '@/components/admin/AdminNavbar/AdminNavbar'
import styles from './page.module.scss'
import VsInlineSelect from '@/components/common/controls/VsInlineSelect/VsInlineSelect'
import OperatorsTable from '@/components/admin/operators/OperatorsTable/OperatorsTable'
import StaffApi from '@/api/admin/StaffApi'
import VsLink from '@/components/common/controls/VsLink/VsLink'
import { useApiServerSide } from '@/hooks/common/api.server'

const SORTING_TYPES = [
  { name: 'Online first', value: 'online-first' },
  { name: 'By name', value: 'by-name' },
]

export default async function OperatorsPage() {
  const staffApi = useApiServerSide(StaffApi)
  const staffMemberList = await staffApi.fetchStaffMemberList()
  const operatorList = staffMemberList.filter(staffMember => !staffMember.is_admin)

  return (
    <main className={styles.root}>
      <AdminNavbar className={styles.navbar} />

      <section className={styles.actions}>
        <VsLink href="/admin/operators/add">Add new operator</VsLink>
        <VsInlineSelect label="Sort by: " options={SORTING_TYPES} />
      </section>

      <OperatorsTable operatorList={operatorList} />
    </main>
  )
}
