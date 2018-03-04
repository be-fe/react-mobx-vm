/**
 * @file picidae.config.js
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var cp = require('child_process')
var nps = require('path')

// Clean picidea dependiencies
// Why don't fire it on postinstall?
// Bacause postinstall will trigger on `npm install react-mobx-vm` too.
cp.execSync('npm run clean-picidae', { stdio: 'inherit' })

var alias = {
  'react-mobx-vm': nps.resolve('./')
}

module.exports = {
  /* eslint-disable no-unused-vars */
  webpackConfigUpdater: function (config, webpack) {
    config.entry.PICIDAE_ENTRY = [
      config.entry.PICIDAE_ENTRY,
      require.resolve('./')
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
  host: 'https://be-fe.github.io/',
  docRoot: './docs',
  theme: 'haier',
  themeConfigsRoot: './theme-configs',
  publicPath: '/react-mobx-vm/',
  transformers: [
    'react-render?' + JSON.stringify({
      lang: 'jsx',
      alias: alias
    }),
    'file-syntax',
    'remark-github-break',
    'toc?test=<toc>',
    // '/Users/yucong02/self/picidae-transformer-import-tree',
    'exec?' + JSON.stringify({
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
