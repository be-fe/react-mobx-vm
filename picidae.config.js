/**
 * @file picidae.config.js
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */

var nps = require('path')

var alias = {
  'react-mobx-vm': nps.resolve('./src')
}

console.log(alias)

module.exports = {
  /* eslint-disable no-unused-vars */
  webpackConfigUpdater: function (config, webpack) {
    config.entry.PICIDAE_ENTRY = [
      config.entry.PICIDAE_ENTRY,
      nps.resolve('./src/index.js')
    ]
    console.log(config.entry)
    config.resolve = config.resolve || {}
    config.resolve.alias = Object.assign({}, alias, config.resolve.alias)
    return config
  },
  ssrWebpackConfigUpdater: function (config) {
    
    var externals = config.externals || []
    externals = [{
      'react-mobx-vm': false
    }].concat(externals)
    config.externals = externals
    return config
  },
  docRoot: './docs',
  theme: 'haier',
  themeConfigsRoot: './theme-configs',

  transformers: [
    'react-render?' + JSON.stringify({
      lang: 'jsx',
      alias: alias
    }),
    'file-syntax',
    'toc?test=<toc>',
    // '/Users/yucong02/self/picidae-transformer-import-tree',
    './picidae-transformer-exec?' + JSON.stringify({
      cwd: 'curr',
      cache: true,
      paths: ['./scripts'],
      env: {
        DOC_ARG: '--format md \
--github \
--project-homepage \
--project-version \
--project-name \
--project-name \
--shallow \
--config documentation.yml \
-o '
      }
    })
  ]
}
