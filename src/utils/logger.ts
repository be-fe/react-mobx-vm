/**
 * @file debugLogger
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */
// import { debuglog } from 'util'

export default {
  debug: function(...args: any[]) {
    if (
      global &&
      (<any>global).VM_DEBUG &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.log('[react-mobx-vm] Debug:', ...args)
    }
  },
  warn: function(...args: any[]) {
    console.warn('[react-mobx-vm] Warning:', ...args)
  },
  error: function(...args: any[]) {
    console.error('[react-mobx-vm] Error:', ...args)
  }
}
