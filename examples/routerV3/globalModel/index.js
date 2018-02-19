/**
 * @file GlobalModel
 * @author Cuttle Cong
 * @date 2018/2/16
 * @description
 */

import { observable } from 'mobx'
import { bindView, Root, urlSync } from '../../../src'
import View from './View'

@bindView(View)
export default class GlobalModel extends Root {
  @urlSync('g', { initialWrite: true })
  @observable value = 'global'
}
