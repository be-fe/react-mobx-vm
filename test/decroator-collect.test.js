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
import collect from '../src/decorator/collect'
import { promisify } from 'util'

function tick(data, callback) {
  setTimeout(callback.bind(null, null), 0, data)
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
