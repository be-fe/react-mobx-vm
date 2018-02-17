/**
 * @file: rollup.config.js
 * @author: Cuttle Cong
 * @date: 2018/2/13
 * @description:
 */
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'dist/react-mobx-vm.min.js',
      format: 'umd',
      name: 'react-mobx-vm'
    },
    external: [
      'react',
      'mobx',
      'mobx-react'
    ],
    plugins: [
      resolve(),
      commonjs(),
      // babel({
      //   exclude: 'node_modules/**',
      //   runtimeHelpers: false
      // })
    ]
  }
]
