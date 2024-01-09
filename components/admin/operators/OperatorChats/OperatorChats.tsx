import VsInput from '@/components/common/controls/VsInput/VsInput'
import styles from './OperatorChats.module.scss'
import SearchIcon from '@/components/common/icons/Search'
import VsSelect from '@/components/common/controls/VsSelect/VsSelect'
import OperatorChatsTable from '../OperatorChatsTable/OperatorChatsTable'
import VsDateRangePicker from '@/components/common/controls/VsDateRangePicker/VsDateRangePicker'

export default function OperatorChats() {
  return (
    <div className={styles.root}>
      <div className={styles.filters}>
        <VsInput type="search" addonIcon={<SearchIcon />} />
        <VsSelect options={[{ name: 'A-C', value: 1 }]} />
        <VsDateRangePicker />
        <VsSelect options={[{ name: 'Any status', value: 1 }]} />
      </div>

      <OperatorChatsTable
        chats={[
          {
            userName: 'placeholder',
            departmentName: 'placeholder',
            date: new Date(),
            status: 'Closed',
            awaitTime: '1 min',
            id: 1,
          },
          {
            userName: 'placeholder',
            departmentName: 'placeholder',
            date: new Date(),
            status: 'Closed',
            awaitTime: '1 min',
            id: 2,
          },
        ]}
      />
    </div>
  )
}
