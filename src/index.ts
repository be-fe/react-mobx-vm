/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/2/14
 * @description
 */

export { default as h } from './renderer/mixedRenderer'
export { observable, action, computed } from 'mobx'
export * from './decorator/index'

export * from './Model'
export { default as symbolicLink } from './utils/symbolicLink'
export { isViewModelComponent } from './decorator/modelComp'
export { default as providerFactory } from './extension/providerFactory'

const { version: _version } = require('../package.json')
export const version: string = _version
