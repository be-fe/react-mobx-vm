/**
 * @file: rollup.config.js
 * @author: Cuttle Cong
 * @date: 2018/2/13
 * @description:
 */
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'


export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-mobx-vm.min.js',
      format: 'umd',
      name: 'react-mobx-vm'
    },
    external: [
      id => {
        console.log(id)
        return true
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true
      }),
      resolve()
    ]
  }
]
