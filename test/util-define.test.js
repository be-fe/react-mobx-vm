/* eslint-disable react/react-in-jsx-scope */
/**
 * @file util-react.test
 * @author Cuttle Cong
 * @date 2018/2/14
 * @description $END$
 */
import * as define from '../src/utils/define'


describe('util-define', function () {
  let host
  beforeEach(function () {
    host = {}
  })

  test('defineProperties', () => {
    define.defineProperties(host, {
      'val': {
        value: 'abc'
      },
      'computed': {
        get() {
          return '123'
        }
      },
      'a.b': {
        value: 'a.b',
        enumerable: false
      }
    })
    expect(Object.keys(host).length).toBe(2)
    expect(host.val).toBe('abc')
    expect(host.computed).toBe('123')
    expect(() => host.computed = '456').toThrow()
    expect(host.computed).toBe('123')
    expect(host['a.b']).toBe('a.b')
  })

  test('defineDeepProperties', () => {
    define.defineDeepProperties(host, {
      'val': {
        value: 'abc'
      }
    })

    expect(() => {
      define.defineDeepProperties(host, {
        'a.b': {
          value: 'abc'
        }
      })
    }).toThrow()

    define.defineDeepProperties(host, {
      'a': {
        value: {}
      },
      'a.b': {
        value: 'abbb'
      }
    })
    expect(host.a).toEqual({ b: 'abbb' })
    expect(host.a.b).toEqual('abbb')
  })

})
