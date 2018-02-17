/**
 * @file: rollup.config.js
 * @author: Cuttle Cong
 * @date: 2018/2/13
 * @description:
 */
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'

const plugins = [
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: false,
    babelrc: false,
    'presets': [
      [
        'env',
        {
          'targets': {
            'node': '6',
            'browsers': ['ie>=9']
          },
          'loose': true,
          'useBuiltIns': true,
          'modules': false
        }
      ],
      'react'
    ],
    'plugins': [
      'add-module-exports',
      [
        'transform-react-jsx', {
          'pragma': 'h'
        }
      ],
      'lodash',
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      'transform-export-extensions'
    ]
  }),
  resolve({
    browser: true
  }),
  commonjs(),
  filesize()
]

const external = [
  'react',
  'mobx',
  'mobx-react',
  'prop-types'
]

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-mobx-vm.js',
      format: 'umd',
      name: 'reactMobxVM',
      exports: 'named'
    },
    external,
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-mobx-vm.min.js',
      format: 'umd',
      name: 'reactMobxVM',
      exports: 'named'
    },
    external,
    plugins: plugins.concat(uglify())
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-mobx-vm.es.js',
      format: 'es',
      name: 'reactMobxVM',
      exports: 'named'
    },
    external,
    plugins
  }
]
