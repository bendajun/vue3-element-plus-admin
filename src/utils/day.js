import dayjs from 'dayjs'

/**
 * 日期格式化
 * @param {Date | string | number} date 日期,可以传一个时间戳和时间格式的字符串
 * @param {string} formatter 格式化模板
 */
export function dateFormat(date, formatter = 'YYYY-MM-DD HH:mm') {
// 兼容时间戳和字符串格式
  if (!date) return ''
  return dayjs(+date ? new Date(+date) : date).format(formatter)
}

/**
 * 获取日期+星期
 * @param {date} date 日期
 * @param {string} formatter 格式化模板
 */
export function dateAndWeekFormat(date = new Date(), formatter = 'MM-DD') {
  var mydate = new Date(date)
  var myddy = mydate.getDay() // getDay可以获取到一周的周几
  var weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return dayjs(date).format(formatter) + weekday[myddy]
}

/**
 * 日期选择格式化
 * 最近7天、最近15天、最近1个月、最近3个月
 * @param {type} type 类型，为0表示获取最近7天的事件段数组
 * @param {object} formatter 格式化选项，默认千分
 */
export function dates(type, formatter = 'YYYY-MM-DD HH:mm:ss') {
  switch (type) {
    case 0: return [
      dayjs().subtract(7, 'day').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ]
    case 1: return [
      dayjs().subtract(15, 'day').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ]
    case 2: return [
      dayjs().subtract(1, 'month').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ]
    case 3: return [
      dayjs().subtract(3, 'month').format('YYYY-MM-DD 00:00:00'),
      dayjs().format('YYYY-MM-DD 23:59:59')
    ]
    case 4: return [
      dayjs().subtract(7, 'day').format(formatter),
      dayjs().subtract(6, 'day').format(formatter),
      dayjs().subtract(5, 'day').format(formatter),
      dayjs().subtract(4, 'day').format(formatter),
      dayjs().subtract(3, 'day').format(formatter),
      dayjs().subtract(2, 'day').format(formatter),
      dayjs().format(formatter)
    ]
  }
}

/**
 * 获取最近一周所有日期
 * @param {string} formatter 格式化模板
 */
export function sevenDate(formatter = 'YYYY-MM-DD') {
  const sevenDays = [
    dayjs().subtract(6, 'day').format(formatter),
    dayjs().subtract(5, 'day').format(formatter),
    dayjs().subtract(4, 'day').format(formatter),
    dayjs().subtract(3, 'day').format(formatter),
    dayjs().subtract(2, 'day').format(formatter),
    dayjs().subtract(1, 'day').format(formatter),
    dayjs().format(formatter)
  ]
  return sevenDays
}

/**
 * 获取所在日期的那一周的7天
 * @param {Date | string | number} date 日期
 * @param {string} formatter 格式化模板
 */
export function getWeekFormat(date, formatter = 'YYYY-MM-DD') {
  let index = dayjs(date).day()
  // 因为获取星期天的话，index为0而不是7
  index = index === 0 ? 7 : index
  const weekArr = []
  for (let i = 1; i <= index - 1; i++) {
    const day = dayjs(date).subtract(i, 'day').format(formatter)
    weekArr.unshift(day)
  }
  weekArr.push(dayjs(date).format(formatter))
  for (let i = 1; i <= 7 - index; i++) {
    const day = dayjs(date).subtract(-i, 'day').format(formatter)
    weekArr.push(day)
  }
  return weekArr
}

/**
 * 获取两个日期之间的所有日期和其对应的星期
 * @param {date} startDay 开始日期
 * @param {date} endDay 结束日期
 * @param {string} formatter 格式化模板
 */
export function getDayArrBetweenStartAndEnd(startDay, endDay, formatter = 'YYYY-MM-DD') {
  // 获取两个日期之间隔的天数的数量
  const num = (dayjs(endDay).diff(startDay, 'day') - 1)
  const dateArr = [startDay]
  if (num > 0) {
    let lastDay = startDay
    for (let i = 1; i <= num; i++) {
      const nextDay = dayjs(lastDay).add(1, 'day').format(formatter)
      dateArr.push(nextDay)
      lastDay = nextDay
    }
  }
  dateArr.push(endDay)
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const dateAndWeekArr = []
  dateArr.forEach(item => {
    const index = dayjs(item).day()
    dateAndWeekArr.push({
      day: item,
      week: weekday[index]
    })
  })
  return dateAndWeekArr
}

/**
 * 根据传入日期获取其上周或者下周的星期几
 * @param {Date | string | number} date 日期
 * @param {Number} number 1到7或者-1到-7，如负7代表获取上周星期一
 * @param {string} formatter 格式化模板
 */
export function getLastOrNextWeekOneDay(date, number, formatter = 'YYYY-MM-DD') {
  return dayjs(date).weekday(number).format(formatter)
}

/**
 * 获取指定指定月份的最后一天
 * @param {Date | string | number} date 日期
 * @param {Number} step 步长，为0表示当月，以此类推
 * @param {string} formatter 格式化模板
 */
export function getLastDay(date, step = 0, formatter = 'YYYY-MM-DD') {
  const ymd = dayjs(+date ? new Date(+date) : date).format(formatter)
  const ymdArr = ymd.split('-')
  const newMonth = Number(ymdArr[1]) + step
  const d = new Date(Number(ymdArr[0]), newMonth, 0)
  return dateFormat(d, formatter)
}
