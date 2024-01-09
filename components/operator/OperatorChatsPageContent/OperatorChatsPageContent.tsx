'use client'

import styles from './OperatorChatsPageContent.module.scss'
import Header from '@/components/common/layout/Header/Header'
import OperatorNavbar from '@/components/operator/OperatorNavbar/OperatorNavabar'
import VsInlineSelect from '@/components/common/controls/VsInlineSelect/VsInlineSelect'
import { StaffMember } from '@/interfaces/api/admin/staff'
import OperatorChatsTable from '../OperatorChatsTable/OperatorChatsTable'
import { Department } from '@/interfaces/api/admin/department'
import ChatWindow from '@/components/common/ChatWindow/ChatWindow'
import { Chat, ChatListResponse } from '@/interfaces/api/admin/chats'
import { useState } from 'react'
import StaffChatProvider from '@/api/admin/StaffChatProvider'
import { useApiClientSide } from '@/hooks/common/api.client'
import ChatsApi from '@/api/admin/ChatsApi'

interface OperatorChatsPageContentProps {
  currentOperator: StaffMember
  currentDepartmentId: string | number
  availableDepartments: Department[]
  initialOperatorChatListResponse: ChatListResponse
}

export default function OperatorChatsPageContent({
  currentOperator,
  currentDepartmentId,
  availableDepartments,
  initialOperatorChatListResponse,
}: OperatorChatsPageContentProps) {
  const [shownChat, setShownChat] = useState<Chat | null>(null)

  const chatsApi = useApiClientSide(ChatsApi)
  const chatProvider = shownChat && StaffChatProvider.forChat(chatsApi, shownChat)

  const onChatStart = (chat: Chat) => {
    setShownChat(chat)
  }

  return (
    <div className={styles.root}>
      <div className={styles.leftBlock}>
        <Header className={styles.header} />

        <main className={styles.main}>
          <OperatorNavbar className={styles.navbar} operatorDepartments={currentOperator.departments} />
          <VsInlineSelect
            className={styles.sortingSelect}
            label="Sort by"
            options={[{ name: 'Waiting time', value: 1 }]}
          />
          <OperatorChatsTable
            currentOperator={currentOperator}
            currentDepartmentId={currentDepartmentId}
            availableDepartments={availableDepartments}
            initialOperatorChatListResponse={initialOperatorChatListResponse}
            shownChatId={shownChat?.id ?? null}
            onChatStart={onChatStart}
          />
        </main>
      </div>
      <div className={styles.rightBlock}>
        {shownChat && <ChatWindow currentUserRole="operator" chatProvider={chatProvider!} />}
      </div>
    </div>
  )
}
