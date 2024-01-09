// Date utility constants and functions

export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const monthNames = {
  full: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

/**
 * Formats a Date object into a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date string.
 */
export const getFormattedDate = (date: Date) => {
  if (!date) return ''
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()
  return `${monthNames.short[monthIndex]} ${day.toString().padStart(2, '0')}, ${year}`
}

export const getFormattedTime = (date: Date) => {
  const stringifiedTime = date.toLocaleTimeString('en-us')
  const [time, period] = stringifiedTime.split(' ')
  const [hours, minutes] = time.split(':')

  return `${hours}:${minutes} ${period}`
}

/**
 * Generates an array of Date objects or null values for a given month and year.
 * This array represents a calendar view of the month.
 *
 * @param {number} year - The year for which the dates are to be generated.
 * @param {number} month - The month for which the dates are to be generated. Zero-based (0 for January, 1 for February, etc.).
 * @return {(Date | null)[]} An array representing the days of the month. Days before the first day of the month are null.
 */

export const getDates = (year: number, month: number): (Date | null)[] => {
  // Determine the day of the week the month starts on (0 for Sunday, 1 for Monday, etc.)
  const startDayOfWeek = new Date(year, month, 1).getDay()

  // Find out the total number of days in the month
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate()

  // Create an array for days before the first day of the month, filled with nulls
  const leadingNulls = Array(startDayOfWeek).fill(null)

  // Create an array of Date objects for each day of the month
  const daysOfMonth = Array.from({ length: totalDaysInMonth }, (_, dayIndex) => new Date(year, month, dayIndex + 1))

  // Combine the arrays to form the full calendar view of the month
  return [...leadingNulls, ...daysOfMonth]
}

export const isFirstDayOfMonth = (date: Date) => date.getDate() === 1

export const isLastDayOfMonth = (date: Date) => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  return date.getDate() === lastDay
}

export const isSameDay = (date1: Date | null, date2: Date | null) =>
  date1?.getDate() === date2?.getDate() &&
  date1?.getMonth() === date2?.getMonth() &&
  date1?.getFullYear() === date2?.getFullYear()

export const isDateInRange = (date: Date, fromDate: Date | null, toDate: Date | null) =>
  Boolean(fromDate && toDate && date >= fromDate && date <= toDate)
