import VsAssignmentBadge from '@/components/common/display/VsAssignmentBadge/VsAssignmentBadge'
import styles from './OperatorChatsTable.module.scss'
import VsMoreLink from '@/components/common/controls/VsMoreLink/VsMoreLink'
import VsTimeBadge from '@/components/common/display/VsTimespanBadge/VsTimespanBadge'

interface OperatorChatsTableProps {
  chats: {
    id: number
    userName: string
    departmentName: string
    date: Date
    status: string
    awaitTime: string
  }[]
}

export default function OperatorChatsTable({ chats }: OperatorChatsTableProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerCell}>#</div>
        <div className={styles.headerCell}>User name</div>
        <div className={styles.headerCell}>Department</div>
        <div className={styles.headerCell}>Date</div>
        <div className={styles.headerCell}>Status</div>
        <div className={styles.headerCell}>Await</div>
        <div className={styles.headerCell}></div>
      </div>
      <div className={styles.rowList}>
        {chats.map((chat, index) => (
          <div className={styles.row} key={chat.id}>
            <div className={styles.rowCell}>{index + 1}</div>
            <div className={styles.rowCell}>
              <VsAssignmentBadge name={chat.userName} />
            </div>

            <div className={styles.rowCell}>{chat.departmentName}</div>

            <div className={styles.rowCell}>{chat.date.toLocaleDateString()}</div>

            <div className={styles.rowCell}>{chat.status}</div>

            <div className={styles.rowCell}>
              <VsTimeBadge timespan={chat.awaitTime} />
            </div>

            <div className={styles.rowCell}>
              <VsMoreLink href={`/admin/chats/${chat.id}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
