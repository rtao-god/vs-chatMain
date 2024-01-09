import React, { useMemo, useCallback } from 'react'
import styles from './VsCalendar.module.scss'
import { weekDayNames, monthNames, getDates } from '@/utils/dates'
import ChevronLeftIcon from '@/components/common/icons/ChevronLeft'
import ChevronRightIcon from '@/components/common/icons/ChevronRight'
import VsCalendarDateCell from '../VsCalendarDateCell/VsCalendarDateCell'

interface CalendarProps {
  onDateSelect: (date: Date) => void
  fromDate: Date | null
  toDate: Date | null
  displayedMonth: number
  currentYear: number
  onPrevMonthSelect?: () => void
  onNextMonthSelect?: () => void
  isNextMonthDisabled?: boolean
  isPrevMonthDisabled?: boolean
}

const VsCalendar: React.FC<CalendarProps> = ({
  onDateSelect,
  fromDate,
  toDate,
  displayedMonth,
  currentYear,
  onPrevMonthSelect,
  onNextMonthSelect,
  isNextMonthDisabled,
  isPrevMonthDisabled,
}) => {
  const dates = useMemo(() => getDates(currentYear, displayedMonth), [currentYear, displayedMonth])

  const handleDateClick = useCallback(
    (date: Date) => {
      if (date) {
        onDateSelect(date)
      }
    },
    [onDateSelect]
  )

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        {onPrevMonthSelect && (
          <button
            className={styles.calendarHeaderButton}
            onClick={onPrevMonthSelect}
            disabled={isPrevMonthDisabled}
            aria-label="Previous Month"
          >
            <ChevronLeftIcon />
          </button>
        )}
        <span className={styles.calendarHeaderTitle}> {`${monthNames.full[displayedMonth]} ${currentYear}`} </span>
        {onNextMonthSelect && (
          <button
            className={styles.calendarHeaderButton}
            onClick={onNextMonthSelect}
            disabled={isNextMonthDisabled}
            aria-label="Next Month"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
      <div className={styles.daysOfWeekGrid}>
        {weekDayNames.map(day => (
          <div key={day} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.datesGrid}>
        {dates.map((date, index) => (
          <VsCalendarDateCell
            key={index}
            date={date}
            fromDate={fromDate}
            toDate={toDate}
            onDateSelect={handleDateClick}
          />
        ))}
      </div>
    </div>
  )
}

export default VsCalendar
