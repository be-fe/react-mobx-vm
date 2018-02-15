/**
 * @file   index
 * @author yucong02
 */

/** global: __DEVELOPMENT__ */

export function invokedWithArgs(args) {
  return (
    args.length !== 3
    || typeof args[0] !== 'object'
    || typeof args[1] !== 'string'
    || typeof args[2] !== 'object'
  )
}

export function newError(type, message) {
  return new Error('@' + type + ': ' + message)
}

export function invokedWithArgsForClass(args) {
  return (
    args.length !== 1
    || typeof args[0] !== 'function'
  )
}
