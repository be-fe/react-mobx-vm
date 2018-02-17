/**
 * @file: decroator-collect
 * @author: Cuttle Cong
 * @date: 2018/2/15
 * @description:
 */
import h from '../src/renderer/mixedRenderer'
import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'mobx-react'
// import { promisify } from 'util'
import collect from '../src/decorator/collect'

function tick(data, callback) {
  setTimeout(callback.bind(null, null), 0, data)
}

function promisify(func) {
  return function p(...args) {
    return new Promise((resolve, reject) => {
      func.apply(this, args.concat(
        function (error, data) {
          if (error) {
            reject(error)
          }
          else {
            resolve(data)
          }
        })
      )
    })
  }
}

const p = promisify(tick)

describe('decroator-collect', function () {
  test('simple spec', async () => {
    class Global {
      aoo = () => p('aoo')
      deep = [() => p('bar')]
    }

    class View extends React.Component {
      render() {
        return null
      }
    }
    const Collected = collect('aoo', 'deep.0')(View)

    const g = new Global()
    let unCollected, collected

    mount(
      <Provider app={g}>
        <div>
          <View ref={r => unCollected = r}/>
          <Collected ref={r => collected = r}/>
        </div>
      </Provider>
    )

    expect(unCollected.app).toBeUndefined()
    expect(collected.app).toBe(g)
    expect(await collect(g.aoo)).toBe('aoo')
    // expect(collected.app.aoo).toBe('aoo')
  })
})
