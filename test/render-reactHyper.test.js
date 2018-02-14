/* eslint-disable indent */
/**
 * @file: react-reactHyper
 * @author: Cuttle Cong
 * @date: 2018/2/14
 * @description:
 * @jest-environment jsdom
 */
import React from 'react'
import { observable } from 'mobx'
import sinon from 'sinon'
import { render, mount } from 'enzyme'
import h from '../src/renderer/reactHyper'
import bind from '../src/decorator/bindView'

describe('render-reactHyper', function () {
  test('<View/>', () => {
    class View extends React.Component {
      render() {
        const { name = 'default', className } = this.props
        return (
          h('div', className, {
            title: 'title'
          }, name)
        )
      }
    }

    const dom = render(h(View, 'outer', { className: 'className' }))
    expect(dom.text()).toBe('default')
    expect(dom.attr('class')).toBe('className')
    expect(dom.attr('title')).toBe('title')
  })

})
