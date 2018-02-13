/**
 * @file: proxy
 * @author: Cuttle Cong
 * @date: 2018/1/23
 * @description:
 */
import { get, set } from 'lodash'

export default function proxy(ref, path, overwrite) {
    const old = get(ref, path)
    const _new = overwrite(old)
    set(ref, path, _new)
}
