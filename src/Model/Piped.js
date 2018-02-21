/**
 * @file Piped
 * @author Cuttle Cong
 * @date 2018/1/29
 * @description
 */
import Root from './Root'

/**
 * 
 * 其对 Root 中的 init/update 进行的无差别的赋值，
 * 如果你需要对 View 中的 props 一股脑都同步至 Model 中，
 * 则可以通过继承该类来实现
 * @public
 * @export
 * @class Piped
 * @extends {Root}
 */
export default class Piped extends Root {
  init(init) {
    this.assignShallow(init)
  }

  update(init) {
    this.assignShallow(init)
  }
}
