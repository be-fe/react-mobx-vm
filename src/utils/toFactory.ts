/**
 * @file toFactory
 * @author Cuttle Cong
 * @date 2018/7/17
 * @description
 */
import inherits from './inherit'

/**
 * Funcify the constructor, see [[createVerifiableClass]].
 * @param FuncConstructor
 * @return {(rule?: Rule, options?: Options) => Result}
 */
export default function toFactory(FuncConstructor) {
  function Factory(...args) {
    if (!(this instanceof FuncConstructor)) {
      return new FuncConstructor(...args)
    }

    FuncConstructor.apply(this, args)
  }
  inherits(Factory, FuncConstructor)

  return Factory
}
