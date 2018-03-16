/* eslint-disable react/react-in-jsx-scope */
/**
 * @file util-react.test
 * @author Cuttle Cong
 * @date 2018/2/14
 * @description $END$
 */
import nearestRefPath from '../src/utils/nearestRefPath'


describe('util-nearestRefPath', function () {

  test('nearestRefPath', () => {
    const host = {
      'a.b': {},
      c: [1, 2, { x: 'y' }]
    }
    expect(nearestRefPath(host, 'a.b').ref).toBeUndefined()
    expect(nearestRefPath(host, 'a.b').path).toBe('b')
    expect(nearestRefPath(host, 'c').ref).toBe(host)
    expect(nearestRefPath(host, 'c').path).toBe('c')

    expect(nearestRefPath(host, 'c.0').ref).toBe(host.c)
    expect(nearestRefPath(host, 'c.0').path).toBe('0')

    expect(nearestRefPath(host, 'c.2.x').path).toBe('x')
    expect(nearestRefPath(host, 'c.2.x').ref).toBe(host.c[2])
  })

})
