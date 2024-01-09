'use client'

import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styles from './VsDateRangePicker.module.scss'
import VsCalendar from '../VsCalendar/VsCalendar'
import { getFormattedDate } from '@/utils/dates'
import useClickOutside from '@/hooks/common/useClickOutside'
import VsButton from '../VsButton/VsButton'
import classNames from 'classnames'
import useElementClientRect from '@/hooks/common/useElementClientRect'

const VsDateRangePicker: React.FC = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null)
  const [dates, setDates] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null })

  const rootRef = useRef<HTMLDivElement | null>(null)
  const calendarRef = useRef<HTMLDivElement | null>(null)
  const inputGroupRef = useRef<HTMLDivElement>(null)

  useClickOutside<HTMLDivElement>(rootRef, () => {
    setIsCalendarVisible(false)
    setActiveInput(null)
  })

  const showCalendar = (inputType: 'from' | 'to') => {
    setActiveInput(inputType)
    setIsCalendarVisible(true)
  }

  const handleSelectDate = (selectedDate: Date) => {
    const notActiveInput = activeInput === 'from' ? 'to' : 'from'
    const newDates = { ...dates, [activeInput!]: selectedDate }

    if ((newDates.from ?? 0) > (newDates.to ?? 0)) {
      newDates[notActiveInput] = null
    }

    const isBothDatesNonNull = !!(newDates.from && newDates.to)

    setDates(newDates)
    if (isBothDatesNonNull) {
      setIsCalendarVisible(false)
      setActiveInput(null)
    } else {
      setDates(newDates)
      setActiveInput(notActiveInput)
    }
  }

  const adjustMonth = useCallback((offset: number) => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + offset))
  }, [])

  const prevMonthDate = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth() - 1), [currentDate])

  const clearDates = () => {
    setDates({ from: null, to: null })

    if (activeInput === 'to') setActiveInput('from')
  }

  const isClearButtonEnabled = dates.from !== null || dates.to !== null

  const getDateInputClassName = (inputType: 'from' | 'to') => {
    return `${styles.dateInput} ${activeInput === inputType ? styles.dateInputActiveInput : ''}`
  }

  const inputGroupClientRect = useElementClientRect(inputGroupRef)
  const [verticalCalendarAlignment, setVerticalCalendarAlignment] = useState('top')
  const [horizontalCalendarAlignment, setHorizontalCalendarAlignment] = useState('right')

  useLayoutEffect(() => {
    if (!inputGroupClientRect || !calendarRef.current) return

    const calendarClientRect = calendarRef.current.getBoundingClientRect()

    const newVerticalCalendarAlignment =
      calendarClientRect.height + inputGroupClientRect.bottom > window.innerHeight ? 'bottom' : 'top'
    if (newVerticalCalendarAlignment !== verticalCalendarAlignment)
      setVerticalCalendarAlignment(newVerticalCalendarAlignment)

    const horizontalSpaceRight = inputGroupClientRect.right - calendarClientRect.width
    const horizontalSpaceLeft = window.innerWidth - inputGroupClientRect.left - calendarClientRect.width
    const newHorizontalCalendarAlignment = horizontalSpaceRight < horizontalSpaceLeft ? 'left' : 'right'
    if (newHorizontalCalendarAlignment !== horizontalCalendarAlignment)
      setHorizontalCalendarAlignment(newHorizontalCalendarAlignment)
  })

  const calendarContainerStyles = {
    [horizontalCalendarAlignment]: 0,
    [verticalCalendarAlignment]: 0,
  }

  return (
    <div className={styles.dateInputWrapper} ref={rootRef}>
      <div className={styles.inputGroup} ref={inputGroupRef}>
        <input
          className={getDateInputClassName('from')}
          placeholder="Date from"
          value={dates.from ? getFormattedDate(dates.from) : ''}
          onClick={() => showCalendar('from')}
          readOnly
        />
        <input
          className={getDateInputClassName('to')}
          placeholder="Date to"
          value={dates.to ? getFormattedDate(dates.to) : ''}
          onClick={() => showCalendar('to')}
          readOnly
        />
      </div>
      {isCalendarVisible && (
        <div
          className={classNames(
            styles.calendarControlGroup,
            verticalCalendarAlignment === 'bottom' && styles.calendarControlGroupTop
          )}
        >
          <div className={styles.calendarsContainer} style={calendarContainerStyles} ref={calendarRef}>
            <div className={styles.calendarsInnerContainer}>
              <VsCalendar
                onDateSelect={selectedDate => handleSelectDate(selectedDate)}
                fromDate={dates.from}
                toDate={dates.to}
                displayedMonth={prevMonthDate.getMonth()}
                currentYear={prevMonthDate.getFullYear()}
                onPrevMonthSelect={() => adjustMonth(-1)}
                isNextMonthDisabled={true}
              />
              <VsCalendar
                onDateSelect={selectedDate => handleSelectDate(selectedDate)}
                fromDate={dates.from}
                toDate={dates.to}
                displayedMonth={currentDate.getMonth()}
                currentYear={currentDate.getFullYear()}
                onNextMonthSelect={() => adjustMonth(1)}
                isPrevMonthDisabled={true}
              />
            </div>
            <div className={styles.buttonContainer}>
              <VsButton onClick={clearDates} className={styles.clearButton} isDisabled={!isClearButtonEnabled}>
                Clear
              </VsButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VsDateRangePicker
