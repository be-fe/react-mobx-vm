/* eslint-disable react/react-in-jsx-scope */
/**
 * @file stateless
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */
import h from '../src/renderer/mixedRenderer'
import { observable } from 'mobx'
import { mount } from 'enzyme'
import stateless from '../src/decorator/stateless'
import bindView from '../src/decorator/bindView'

describe('stateless', function () {
  test('simple case', () => {
    const SimpleView = stateless((local, props) => (
      <div>
        <span id="local">{local.name}</span>
        <span id="prop">{props.name}</span>
      </div>
    ))

    @bindView(SimpleView)
    class Model {
      @observable name = 'modelName'
    }

    const VM = new Model
    const wrapper = mount(<VM name={'propName'}/>)
    expect(wrapper.find('#prop').text()).toBe('propName')
    expect(wrapper.find('#local').text()).toBe('modelName')
    VM.name = 'yyoo'
    expect(wrapper.find('#prop').text()).toBe('propName')
    expect(wrapper.find('#local').text()).toBe('yyoo')
  })
})
