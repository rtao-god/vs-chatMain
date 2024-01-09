import AuthApi from '@/api/AuthApi'
import { useApiServerSide } from '@/hooks/common/api.server'
import OperatorChatsPageContent from '@/components/operator/OperatorChatsPageContent/OperatorChatsPageContent'
import DepartmentsApi from '@/api/admin/DepartmentsApi'
import { StaffMember } from '@/interfaces/api/admin/staff'
import { Department } from '@/interfaces/api/admin/department'
import { loadBulk } from '@/hooks/common/api'
import ChatsApi from '@/api/admin/ChatsApi'
import { ChatListRequestOptions, ChatListResponse } from '@/interfaces/api/admin/chats'

interface OperatorChatsPageProps {
  params: { departmentId: string }
}

interface OperatorChatsPageData {
  availableDepartments: Department[]
  initialOperatorChatListResponse: ChatListResponse
}

export default async function OperatorChatsPage({ params }: OperatorChatsPageProps) {
  const authApi = useApiServerSide(AuthApi)
  const departmentsApi = useApiServerSide(DepartmentsApi)
  const chatsApi = useApiServerSide(ChatsApi)

  const currentOperator = await authApi.getCurrentUser()
  const chatListRequestOptions: ChatListRequestOptions = { operatorId: currentOperator.id }
  if (params.departmentId !== 'all') {
    chatListRequestOptions.operatorId = params.departmentId
  }

  const pageData = await loadBulk<OperatorChatsPageData>({
    availableDepartments: departmentsApi.fetchDepartmentList(),
    initialOperatorChatListResponse: chatsApi.fetchChatList(chatListRequestOptions),
  })

  return (
    <OperatorChatsPageContent
      currentOperator={currentOperator}
      currentDepartmentId={params.departmentId}
      {...pageData}
    />
  )
}
