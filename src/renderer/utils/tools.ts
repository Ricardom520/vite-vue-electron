/**
 * 格式化时长
 * @return {string}
 */
export function formatDuration(time: number) {
  if (!time) return '00:00'

  let minute: string | number = Math.floor(time / 60)

  if (minute >= 1) {
    time = time - minute * 60
  }

  let second: string | number = Math.floor(time)

  minute = minute > 9 ? minute : `0${minute}`
  second = second > 9 ? second : `0${second}`

  return `${minute}:${second}`
}

/**
 * int型转换
 * @return {number}
 */
export function formatTimeToNumber(str: string) {
  if (!str) return 0

  const arrs = str.split(':')

  return +arrs[0] * 60 + +arrs[1]
}