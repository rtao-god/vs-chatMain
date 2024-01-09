'use client'

import styles from './OperatorChatsTable.module.scss'
import { Department } from '@/interfaces/api/admin/department'
import { Chat, ChatListResponse } from '@/interfaces/api/admin/chats'
import { useFractionalLoading } from '@/hooks/common/api.client'
import ChatsApi from '@/api/admin/ChatsApi'
import { StaffMember } from '@/interfaces/api/admin/staff'
import OperatorChatTableRow from './OperatorChatTableRow/OperatorChatTableRow'

interface OperatorChatsTableProps {
  currentOperator: StaffMember
  currentDepartmentId: string | number
  availableDepartments: Department[]
  initialOperatorChatListResponse: ChatListResponse
  shownChatId: number | null
  onChatStart?: (chat: Chat) => void
}

export default function OperatorChatsTable({
  currentOperator,
  availableDepartments,
  initialOperatorChatListResponse,
  shownChatId,
  onChatStart,
}: OperatorChatsTableProps) {
  const [chatList, rootEl] = useFractionalLoading(initialOperatorChatListResponse, ChatsApi, 'fetchChatList', {
    operatorId: currentOperator.id,
  })

  return (
    <div className={styles.root} ref={rootEl}>
      <div className={styles.header}>
        <div className={styles.headerCell}>User</div>
        <div className={styles.headerCell}>Last message</div>
        <div className={styles.headerCell}>Time</div>
        <div className={styles.headerCell}>Operator</div>
        <div className={styles.headerCell}>Action</div>
      </div>

      <div className={styles.rows}>
        {chatList.map(chat => (
          <OperatorChatTableRow
            chat={chat}
            availableDepartments={availableDepartments}
            currentOperator={currentOperator}
            key={chat.id}
            isChatShown={chat.id === shownChatId}
            onChatStart={onChatStart}
          />
        ))}
      </div>
    </div>
  )
}
