import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.locale('vi')

export const formatDate = (
  date: string | Date,
  format: string = 'DD/MM/YYYY'
) => {
  return dayjs(date).format(format)
}

export const isBeforeToday = (date?: string | Date) => {
  return date ? dayjs(date).isBefore(dayjs(), 'day') : false
}
