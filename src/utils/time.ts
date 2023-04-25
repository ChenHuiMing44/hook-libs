import dayjs from 'dayjs'

export const format = (date: any, reg = 'YYYY-MM-DD HH:mm:ss') => {
  const time = dayjs(date)
  if(!time.isValid()) {
    return date.toString()
  }
  return time.format(reg)
}
