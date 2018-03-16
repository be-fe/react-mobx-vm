/**
 * @file rollup.config.js
 * @author Cuttle Cong
 * @date 2018/2/13
 * @description
 */
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'

import { join } from 'path'

const plugins = [
  json(),
  babel({
    include: [
      join(__dirname, 'src', '**', '*.js')
      // /\.json$/,
      // 'node_modules/**'
    ],
    exclude: 'node_modules/**',
    runtimeHelpers: true,
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
      'external-helpers',
      // 'add-module-exports',
      [
        'transform-react-jsx', {
          'pragma': 'h'
        }
      ],
      'lodash',
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      'transform-export-extensions',
      [
        'transform-runtime',
        {
          helpers: false,
          'polyfill': false,
          'regenerator': true
        }
      ]
    ]
  }),
  resolve({
    browser: true
  }),
  commonjs({
    include: 'node_modules/**'
  }),
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
      file: 'dist/react-mobx-vm.umd.js',
      format: 'umd',
      name: 'reactMobxVM'
    },
    external,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ].concat(plugins),
    sourceMap: true
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-mobx-vm.umd.min.js',
      format: 'umd',
      name: 'reactMobxVM'
    },
    external,
    plugins: plugins.concat(uglify(), replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })),
    sourceMap: true
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-mobx-vm.es.js',
      format: 'es'
    },
    external: id => {
      return id.startsWith('babel-runtime')
             || id.startsWith('lodash')
             || ['qs'].concat(external).includes(id)
    },
    plugins,
    sourceMap: true
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/react-mobx-vm.js',
      format: 'cjs'
    },
    external: id => {
      return id.startsWith('babel-runtime')
             || id.startsWith('lodash')
             || ['qs'].concat(external).includes(id)
    },
    plugins,
    sourceMap: true
  }
]
