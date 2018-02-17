/**
 * @file: gojs.jsloader.js
 * @author: Cuttle Cong
 * @date: 2018/2/16
 * @description:
 */
const nps = require('path')

module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [
      nps.join(__dirname, '..')
    ],
    exclude: [
      /(\/)node_modules\1(core-js|babel-runtime)\1/
    ],
    query: {
      cacheDirectory: true
    }
  }
]
