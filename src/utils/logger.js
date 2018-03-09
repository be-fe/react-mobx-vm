/**
 * @file debugLogger
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */
// import { debuglog } from 'util'

export default {
  debug: function (...args) {
    if (global && global.VM_DEBUG || process.env.NODE_ENV !== 'production') {
      console.log('[react-mobx-vm] Debug:',...args)
    }
  },
  warn: function (...args) {
    console.warn('[react-mobx-vm] Warning:', ...args)
  },
  error: function (...args) {
    console.error('[react-mobx-vm] Error:',...args)
  }
}
