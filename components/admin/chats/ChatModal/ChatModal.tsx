'use client'

import classNames from 'classnames'
import styles from './ChatModal.module.scss'
import ChatModalContent from './ChatModalContent/ChatModalContent'
import { Chat } from '@/interfaces/api/admin/chats'

interface ChatModalProps {
  isShown?: boolean
  chat: Chat
  onClose?: () => void
}

export default function ChatModal({ isShown, chat, onClose }: ChatModalProps) {
  const onRootClick = () => {
    onClose?.()
  }

  const onChatWrapperClick: React.MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation()
  }

  return (
    <div className={classNames(styles.root, !isShown && styles.rootHidden)} onClick={onRootClick}>
      <div className={classNames(styles.backdrop, !isShown && styles.backdropHidden)}></div>
      <div className={classNames(styles.chatWrapper, !isShown && styles.chatWrapperHidden)} onClick={onChatWrapperClick}>
        {isShown && <ChatModalContent chat={chat} />}
      </div>
    </div>
  )
}
