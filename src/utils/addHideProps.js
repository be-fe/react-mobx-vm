/**
 * @file addHideProps
 * @author Cuttle Cong
 * @date 2018/4/20
 * @description
 */


export default function addHideProps(ref, prop, value) {
  Object.defineProperty(
    ref, prop,
    {
      value,
      enumerable: false,
      configurable: true,
      writable: true
    }
  )
}
