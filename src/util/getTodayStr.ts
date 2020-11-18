import dayjs from 'dayjs'
import iosWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(iosWeek)

export default function getTodayStr(): string {
  const today = dayjs()
  const dayOfWeek = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'][today.isoWeekday()]

  return `${dayOfWeek} ${today.format(' MMM DD YYYY')}`
}
