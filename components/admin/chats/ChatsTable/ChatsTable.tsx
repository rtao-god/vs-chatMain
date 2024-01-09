'use client'

import VsAssignmentBadge from '@/components/common/display/VsAssignmentBadge/VsAssignmentBadge'
import styles from './ChatsTable.module.scss'
import VsTimeBadge from '@/components/common/display/VsTimespanBadge/VsTimespanBadge'
import { Chat, ChatListResponse } from '@/interfaces/api/admin/chats'
import { useMemo } from 'react'
import { Department } from '@/interfaces/api/admin/department'
import { mapBy } from '@/utils/misc'
import { useFractionalLoading } from '@/hooks/common/api.client'
import ChatsApi from '@/api/admin/ChatsApi'
import classNames from 'classnames'
import ChatAction from './ChatAction/ChatAction'
import { getFormattedDate } from '@/utils/dates'

interface ChatsTableProps {
  initialChatListResponse: ChatListResponse
  departments: Department[]
}

export default function ChatsTable({
  initialChatListResponse,
  departments,
}: ChatsTableProps) {
  const [chatList, rootEl] = useFractionalLoading(initialChatListResponse, ChatsApi, 'fetchChatList')

  const departmentsById = useMemo(() => mapBy(departments, 'id'), [departments])

  const getChatDisplayDate = (chat: Chat) => {
    if (!chat.updated_at) return ''
    const parsedDate = new Date(chat.updated_at)
    return getFormattedDate(parsedDate)
  }

  const getChatDepartmentName = (chat: Chat) => {
    return departmentsById.get(chat.department_id)?.name
  }

  const getChatOperatorPriority = (chat: Chat) => {
    const chatDepartment = departments.find(department => department.id === chat.department_id)
    if (!chatDepartment) return undefined

    const chatDepartmentOperator = chatDepartment.users.find(operator => operator.id === chat.client.id)
    if (!chatDepartmentOperator) return undefined

    return chatDepartmentOperator.priority
  }

  return (
    <div className={styles.root} ref={rootEl}>
      <div className={styles.header}>
        <div className={styles.headerCell}>#</div>
        <div className={styles.headerCell}>User name</div>
        <div className={styles.headerCell}>Operator name</div>
        <div className={styles.headerCell}>Department</div>
        <div className={styles.headerCell}>Date</div>
        <div className={styles.headerCell}>Status</div>
        <div className={styles.headerCell}>Await</div>
        <div className={styles.headerCell}>Chat</div>
      </div>
      <div className={styles.rowList}>
        {chatList.map((chat, index) => (
          <div className={styles.row} key={chat.id}>
            <div className={styles.rowCell}>{index + 1}</div>
            <div className={styles.rowCell}>
              <VsAssignmentBadge name={chat.client.name} />
            </div>

            <div className={styles.rowCell}>
              <VsAssignmentBadge name={chat.user?.name ?? 'Not assigned'} count={getChatOperatorPriority(chat)} />
            </div>

            <div className={styles.rowCell}>{getChatDepartmentName(chat)}</div>

            <div className={styles.rowCell}>{getChatDisplayDate(chat)}</div>

            <div className={classNames(styles.rowCell, styles.rowCellStatus)}>{chat.status}</div>

            <div className={styles.rowCell}>
              <VsTimeBadge timespan="placeholder" />
            </div>

            <div className={styles.rowCell}>
              <ChatAction chat={chat} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
