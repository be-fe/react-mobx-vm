/* eslint-disable react/react-in-jsx-scope */
/**
 * @file: util-react.test
 * @author: Cuttle Cong
 * @date: 2018/2/14
 * @description: $END$
 */
import * as React from 'react'
import { render } from 'enzyme'
import sinon from 'sinon'
import createReactClass from 'create-react-class'
import h from '../src/renderer/mixedRenderer'
import proxy from '../src/utils/proxy'
import * as util from '../src/utils/reactUtils'

class Component extends React.Component {
  render() {
    return <div>
      { this.props.name }
      { this.props.children }
    </div>
  }
}

describe('util-react', function () {
  test('util-react displayName', () => {
    class ABC extends React.Component {
      render() {
        return <div>
          { this.props.name }
          { this.props.children }
        </div>
      }
    }

    function CBA() {
    }


    expect(util.displayName(ABC)).toBe('ABC')
    expect(util.displayName(<ABC/>)).toBe('ABC')
    expect(util.displayName(<CBA/>)).toBe('CBA')
    expect(util.displayName(CBA)).toBe('CBA')
    expect(util.displayName(() => {})).toBe('Unknown')
  })

  test('util-react isComponentInstance', () => {
    expect(util.isComponentInstance(Component.prototype)).toBeTruthy()
  })

  test('util-react isComponentClass', () => {
    // eslint-disable-next-line react/display-name
    expect(util.isComponentClass(
      // eslint-disable-next-line react/display-name
      createReactClass({
        render: function() {
          return null
        }
      })
    )).toBeTruthy()
    expect(util.isComponentClass(<Component/>)).toBeFalsy()
    expect(util.isComponentClass(Component)).toBeTruthy()
  })

  test('util-react assertReactClass', () => {
    expect(
      () => util.assertReactClass(<Component/>, 'assertReactClass')
    ).toThrow('assertReactClass require ReactClass')
  })

  test('util-react convertReactElement', () => {
    const converted = util.convertReactElement(
      <div>
        <Component/>
      </div>, [
        [
          (element) => element.type === Component,
          (element) => React.cloneElement(element, { name: 'convert' }, <h1>Heading</h1>)
        ],
        [
          (element) => element.type === 'div',
          (element, index, parent, children) => React.cloneElement(element, { className: 'convert-classname' }, <h1>Big</h1>, children)
        ]
      ]
    )

    const dom = render(converted)
    expect(dom.text()).toBe('BigconvertHeading')
    expect(dom.attr('class')).toBe('convert-classname')
    expect(dom.html()).toMatchSnapshot()
  })

  test('util-react proxy', () => {
    const obj = {
      callback: () => {}
    }
    const spy = sinon.spy(obj, 'callback')
    proxy(obj, 'callback', function (callback) {
      return function () {
        callback && callback()
        return callback()
      }
    })

    obj.callback()
    expect(spy.callCount).toBe(2)
  })

  test('util-react isElementOf', () => {
    expect(util.isElementOf(Component)(<Component/>)).toBeTruthy()

    expect(util.isElementOf(React.Component)(<Component/>)).toBeFalsy()
  })
})
