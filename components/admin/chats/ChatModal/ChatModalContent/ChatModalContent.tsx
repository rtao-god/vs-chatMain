import ChatWindow from '@/components/common/ChatWindow/ChatWindow'
import { useChatProvider } from '@/hooks/common/api.client'
import { Chat } from '@/interfaces/api/admin/chats'

interface ChatModalContentProps {
  chat: Chat
}

export default function ChatModalContent({ chat }: ChatModalContentProps) {
  const chatProvider = useChatProvider(chat)

  return <ChatWindow chatProvider={chatProvider} currentUserRole="operator" isReadOnly></ChatWindow>
}
