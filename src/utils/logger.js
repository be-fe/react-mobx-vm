/**
 * @file: debugLogger
 * @author: Cuttle Cong
 * @date: 2018/2/15
 * @description:
 */
// import { debuglog } from 'util'

export default {
  debug: function (...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(...args)
    }
  },
  warn: function (...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(...args)
    }
  },
  error: function (...args) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(...args)
    }
  }
}
