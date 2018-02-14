/**
 * @file: Piped
 * @author: Cuttle Cong
 * @date: 2018/1/29
 * @description:
 */
import Root from './Root'

export default class Piped extends Root {
  init(init) {
    this.assignShallow(init)
  }

  update(init) {
    this.assignShallow(init)
  }
}
