import { useState } from 'react'
import ChatModal from '../../ChatModal/ChatModal'
import VsArrowButton from '@/components/common/controls/VsArrowButton/VsArrowButton'
import { Chat } from '@/interfaces/api/admin/chats'

interface ShowChatButtonProps {
  chat: Chat
}

export default function ChatAction({ chat }: ShowChatButtonProps) {
  const [isShown, setIsShown] = useState(false)

  const onShowButtonClick = () => {
    setIsShown(true)
  }

  const onModalClose = () => {
    setIsShown(false)
  }

  return (
    <>
      <VsArrowButton onClick={onShowButtonClick}>Show</VsArrowButton>
      <ChatModal isShown={isShown} onClose={onModalClose} chat={chat} />
    </>
  )
}
