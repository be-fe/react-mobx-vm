/**
 * @file inherit
 * @author Cuttle Cong
 * @date 2018/4/20
 * @description
 */

export default function inherit(Child, Super) {
  const extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function(Child, Super) {
        Child.__proto__ = Super
      }) ||
    function(Child, Super) {
      for (let p in Super) if (Super.hasOwnProperty(p)) Child[p] = Super[p]
    }
  extendStatics(Child, Super)
  // Node Version
  Child.super_ = Super
  function __() {
    this.constructor = Child
  }
  Child.prototype = Object.setPrototypeOf
    ? Object.setPrototypeOf(Child.prototype, Super.prototype)
    : Super === null
      ? Object.create(Super)
      : ((__.prototype = Super.prototype), new __())
}
