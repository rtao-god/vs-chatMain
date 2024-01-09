import VsAssignmentBadge from '@/components/common/display/VsAssignmentBadge/VsAssignmentBadge'
import styles from './OperatorChatTableRow.module.scss'
import { Chat } from '@/interfaces/api/admin/chats'
import { StaffMember } from '@/interfaces/api/admin/staff'
import { Department } from '@/interfaces/api/admin/department'
import { getFormattedTime } from '@/utils/dates'
import VsCompactSelect from '@/components/common/controls/VsCompactSelect/VsCompactSelect'
import classNames from 'classnames'
import VsButton from '@/components/common/controls/VsButton/VsButton'
import { mapOptions } from '@/utils/options'
import { useEffect, useLayoutEffect, useState } from 'react'
import StaffChatProvider from '@/api/admin/StaffChatProvider'
import { useApiClientSide } from '@/hooks/common/api.client'
import ChatsApi from '@/api/admin/ChatsApi'
import { ChatMessage } from 'vs_chat_widget_front/interfaces/chat'

interface OperatorChatTableRowProps {
  chat: Chat
  currentOperator: StaffMember
  availableDepartments: Department[]
  isChatShown?: boolean
  onChatStart?: (chat: Chat) => void
}

export default function OperatorChatTableRow({
  chat,
  currentOperator,
  availableDepartments,
  isChatShown,
  onChatStart,
}: OperatorChatTableRowProps) {
  const departmentOptions = mapOptions(availableDepartments, 'name')

  const chatsApi = useApiClientSide(ChatsApi)
  const chatProvider = StaffChatProvider.forChat(chatsApi, chat)

  const getChatDepartment = (chat: Chat) => {
    const chatDepartment = availableDepartments.find(department => department.id === chat.department_id)
    return chatDepartment
  }

  const getChatTime = (chat: Chat) => {
    const parsedChatUpdateDate = new Date(chat.updated_at ?? chat.created_at)
    return getFormattedTime(parsedChatUpdateDate)
  }

  const showChatButtonLabel = isChatShown ? 'Chatting...' : 'Start a chat'

  const getLatestChatMessage = () => {
    const loadedMessages: ChatMessage[] = []
    for (const messageBlock of chatProvider.loadedOldMessageBlocks) {
      loadedMessages.push(...messageBlock.messages)
    }

    loadedMessages.push(...chatProvider.newMessageBlock.messages)
    loadedMessages.sort((a, b) => b.date.getTime() - a.date.getTime())
    return loadedMessages[0]
  }

  const [isLastMessageLoading, setIsLastMessageLoading] = useState(true)
  const [latestMessage, setLatestMessage] = useState<ChatMessage | undefined>(getLatestChatMessage)

  const onOldChatMessageBlockLoad = () => {
    setLatestMessage(getLatestChatMessage)
  }

  const onNewChatMessage = (chatMessage: ChatMessage) => {
    setLatestMessage(chatMessage)
  }

  useEffect(() => {
    if (isLastMessageLoading && chatProvider.loadedOldMessageBlocks.length) {
      setIsLastMessageLoading(false)
    }

    chatProvider.on('old-block-load', onOldChatMessageBlockLoad)
    chatProvider.on('new-message', onNewChatMessage)

    return () => {
      chatProvider.off('old-block-load', onOldChatMessageBlockLoad)
      chatProvider.off('new-message', onNewChatMessage)
    }
  })

  const displayedLastMessage = isLastMessageLoading ? 'Loading...' : latestMessage?.content

  const onChatStartLocal = () => {
    onChatStart?.(chat)
  }

  return (
    <div className={styles.row} key={chat.id}>
      <div className={styles.rowCell}>
        <VsAssignmentBadge className={styles.userName} name={chat.client.name} />
        {/* <div className={styles.userDepartment}>Sample department</div> */}
      </div>

      <div className={classNames(styles.rowCell)}>
        <div className={classNames(styles.lastMessage, isLastMessageLoading && styles.lastMessageLoading)}>
          {displayedLastMessage}
        </div>
      </div>

      <div className={styles.rowCell}>{getChatTime(chat)}</div>

      <div className={styles.rowCell}>
        <VsCompactSelect options={departmentOptions} value={getChatDepartment(chat)} />
      </div>

      <div className={classNames(styles.rowCell, styles.rowCellActions)}>
        <VsButton size="small" isDisabled={isChatShown} onClick={onChatStartLocal}>
          {showChatButtonLabel}
        </VsButton>
      </div>
    </div>
  )
}
