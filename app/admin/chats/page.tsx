import styles from './page.module.scss'
import VsInput from '@/components/common/controls/VsInput/VsInput'
import VsSelect from '@/components/common/controls/VsSelect/VsSelect'
import SearchIcon from '@/components/common/icons/Search'
import ChatsTable from '@/components/admin/chats/ChatsTable/ChatsTable'
import { useApiServerSide } from '@/hooks/common/api.server'
import ChatsApi from '@/api/admin/ChatsApi'
import DepartmentsApi from '@/api/admin/DepartmentsApi'
import { ChatListResponse } from '@/interfaces/api/admin/chats'
import { Department } from '@/interfaces/api/admin/department'
import { loadBulk } from '@/hooks/common/api'
import AdminNavbar from '@/components/admin/AdminNavbar/AdminNavbar'

interface ChatsPageData {
  chatListResponse: ChatListResponse
  departments: Department[]
}

export default async function ChatsPage() {
  const chatsApi = useApiServerSide(ChatsApi)
  const departmentsApi = useApiServerSide(DepartmentsApi)

  const pageData = await loadBulk<ChatsPageData>({
    chatListResponse: chatsApi.fetchChatList(),
    departments: departmentsApi.fetchDepartmentList(),
  })

  return (
    <main className={styles.root}>
      <AdminNavbar className={styles.navbar} />

      <div className={styles.filters}>
        <VsInput type="search" addonIcon={<SearchIcon />} />
        <VsSelect options={[{ name: 'A-C', value: 1 }]} />
        <VsInput type="date" />
        <VsSelect options={[{ name: 'Any status', value: 1 }]} />
      </div>

      <ChatsTable
        initialChatListResponse={pageData.chatListResponse}
        departments={pageData.departments}
      />
    </main>
  )
}
