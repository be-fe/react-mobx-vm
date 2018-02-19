/**
 * @file decorator-inject
 * @author Cuttle Cong
 * @date 2018/2/15
 * @description
 */

import { observable } from 'mobx/lib/mobx'
import { Provider } from 'mobx-react'
import { mount } from 'enzyme'
import React from 'react'
import inject from '../src/decorator/injectInverseInherit'
import injectExt from '../src/decorator/injectExt'
import bindView from '../src/decorator/bindView'
import h from '../src/renderer/mixedRenderer'

describe('decorator-inject', function () {

  class View extends React.Component {
    render() {
      return <div>
        <span>{ this.app ? this.app.gName : this.local.name }</span>
      </div>
    }
  }

  class Model {
    @observable name = 'name'
  }

  class Global {
    @observable gName = 'gName'
  }
  let unInjected, injected, injectedExt

  const InjectedView = inject()(View)
  const InjectedExtView = injectExt(
    app => app.gName = 'fixedName'
  )(View)

  const app = new Global
  const provider = (
    <Provider app={app}>
      <div>
        {
          h(new (bindView(View)(Model)), {
            ref: r => unInjected = r
          })
        }
        {
          h(new (bindView(InjectedView)(Model)), {
            ref: r => injected = r
          })
        }
        {
          h(new (bindView(InjectedExtView)(Model)), {
            ref: r => injectedExt = r
          })
        }
      </div>
    </Provider>
  )
  const wrapper = mount(provider)

  test('displayName', () => {
    expect(View.name).toBe('View')
    expect(InjectedView.displayName).toBe('Inject-View')
    expect(InjectedExtView.displayName).toBe('Inject-Ext-View')
  })

  test('unInjected', () => {
    expect(unInjected.app).toBeUndefined()
    expect(wrapper.find('span').at(0).text()).toBe('name')
  })

  test('injected', () => {
    expect(injected.app).toBe(app)
    expect(wrapper.find('span').at(1).text()).toBe('fixedName')
    app.gName = 'updatedGName'
    expect(wrapper.find('span').at(1).text()).toBe('updatedGName')
  })

  test('injectedExt', () => {
    expect(injectedExt.app).toBe(app)
    expect(wrapper.find('span').at(2).text()).toBe('updatedGName')
  })
})
