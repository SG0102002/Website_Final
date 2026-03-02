// Malaysia timezone: UTC+8
const MALAYSIA_TZ = 'Asia/Kuala_Lumpur'

export function isWeekday(date: Date): boolean {
  const day = date.getDay()
  return day >= 1 && day <= 5 // Monday to Friday
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // Sunday or Saturday
}

export function getAvailableTimeSlots(date: Date): string[] {
  if (isWeekday(date)) {
    // Weekdays: 5pm - 10pm (17:00 - 22:00)
    // Hourly slots: 17:00, 18:00, 19:00, 20:00, 21:00
    return ['17:00', '18:00', '19:00', '20:00', '21:00']
  } else {
    // Weekends: 9am - 5pm (09:00 - 17:00)
    // Hourly slots: 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00
    return ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
  }
}

export function getMaxBookingsForDate(date: Date): number {
  return isWeekday(date) ? 2 : 6
}

export function isValidBookingTime(date: Date, time: string): boolean {
  const availableSlots = getAvailableTimeSlots(date)
  return availableSlots.includes(time)
}

export function isAtLeast48HoursAway(bookingDate: Date): boolean {
  const now = new Date()
  const malaysiaTime = new Date(now.toLocaleString('en-US', { timeZone: MALAYSIA_TZ }))
  const diffInMs = bookingDate.getTime() - malaysiaTime.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)

  return diffInHours >= 48
}

export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: MALAYSIA_TZ
  })
}

export function formatTimeForDisplay(timeString: string): string {
  const [hours] = timeString.split(':')
  const hour = parseInt(hours, 10)

  if (hour === 0) return '12:00 AM'
  if (hour < 12) return `${hour}:00 AM`
  if (hour === 12) return '12:00 PM'
  return `${hour - 12}:00 PM`
}
