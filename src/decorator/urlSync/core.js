/* eslint-disable */
/**
 * @file: index
 * @author: Cuttle Cong
 * @date: 2017/11/6
 * @description:
 */
import { action } from 'mobx'
import getStateLifeDecorator, { assignState } from '../utils/getStateLifeDecorator'
import logger from '../../utils/logger'
// import globalContext from '../../utils/globalContext'


let useHistory, unlisten, collection = {}
export function register(history) {
  useHistory = history
}

function assertHistory() {
  if (!useHistory) {
    console.error(
      'Error: You DO NOT \`register(history)\` before using urlSync. '
      + 'NOTE: \`history\` should be from \'history\' or \'react-router\''
    )
    throw new Error('NOT `register(history)`')
  }
}

function checkExistedName(name) {
  const f = collection[name]
  if (f) {
    logger.error(`Warning: "${name}" has already been used in urlSync before. Please rename it: \`@urlSync('rename')\``)
  }
}

export default getStateLifeDecorator({
  init(self, property, name) {
    assertHistory()
    checkExistedName(name)
    collection[name] = assignState.bind(null, self, property)
    if (unlisten) {
      // unListen previous listener
      return
    }
    unlisten = useHistory.listen(
      action(
        location => {
          if (location.action === 'POP') {
            Object
              .keys(collection)
              .forEach(name => {
                const assign = collection[name]
                if (name in location.query) {
                  assign(location.query[name])
                }
              })
          }
        }
      )
    )
  },
  exit(self, property, name) {
    delete collection[name]
  },
  saveFirstTime(key, value, data) {
    assertHistory()
    useHistory.replace({
      ...data,
      query: { ...data.query, [key]: value }
    })
  },
  save(key, value, data) {
    assertHistory()
    useHistory.push({
      ...data,
      query: { ...data.query, [key]: value }
    })
  },
  fetch() {
    assertHistory()
    return useHistory.getCurrentLocation()
  },
  get(key) {
    assertHistory()
    return this.fetch().query[key]
  }
}, 'urlsync')
