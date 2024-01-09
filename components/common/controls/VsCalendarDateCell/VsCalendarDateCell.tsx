import React, { useMemo } from 'react'
import classNames from 'classnames'
import styles from './VsCalendarDateCell.module.scss'
import { isSameDay, isDateInRange, isFirstDayOfMonth, isLastDayOfMonth } from '@/utils/dates'

interface VsCalendarDateCellProps {
  date: Date | null
  fromDate: Date | null
  toDate: Date | null
  onDateSelect: (date: Date) => void
}

const VsCalendarDateCell: React.FC<VsCalendarDateCellProps> = React.memo(({ date, fromDate, toDate, onDateSelect }) => {
  if (!date) {
    return <div className={styles.dateCellEmpty} />
  }

  const getDateClasses = useMemo(() => {
    const isSelected = (fromDate && isSameDay(date, fromDate)) || (toDate && isSameDay(date, toDate))
    const inRange = fromDate && toDate && isDateInRange(date, fromDate, toDate) && !isSelected
    const isFirstDay = isFirstDayOfMonth(date) && inRange && !isSelected
    const isLastDay = isLastDayOfMonth(date) && inRange && !isSelected

    return classNames(styles.dateCell, {
      [styles.dateCellActive]: date <= new Date(),
      [styles.dateCellSelected]: isSelected,
      [styles.dateCellInRange]: inRange && !isFirstDay && !isLastDay,
      [styles.dateCellFirstDayOfMonth]: isFirstDay,
      [styles.dateCellLastDayOfMonth]: isLastDay,
      [styles.dateCellFuture]: date > new Date(),
    })
  }, [date, fromDate, toDate])

  const handleOnClick = () => {
    onDateSelect?.(date)
  }

  return (
    <div
      className={getDateClasses}
      onClick={handleOnClick}
      role="button"
      tabIndex={0}
      aria-label={`Select date ${date.toISOString().slice(0, 10)}`}
    >
      {date.getDate()}
    </div>
  )
})

export default VsCalendarDateCell
