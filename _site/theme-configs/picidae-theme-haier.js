/**
 * @file picidae-theme-haier
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var nps = require('path')
var remoteOriginUrl = require('remote-origin-url')
var pack = require('../../package.json')
var remote = remoteOriginUrl.sync(nps.join(__dirname, '../..'))
if (remote) {
  remote = remote.replace(/\.git$/, '')
}
else {
  remote = 'https://github.com/be-fe/react-mobx-vm'
}

module.exports = {
  logo: {
    src: 'https://raw.githubusercontent.com/be-fe/react-mobx-vm/master/logo.svg?sanitize=true',
    name: 'React Mobx VM'
  },

  // work on title
  description: pack.description,
  defaultLang: 'zh',

  headers: [
    // 'docs',
    {
      i18n: {
        en: 'guide',
        zh: '指引'
      },
      url: '/guide/'
    },
    'api',
    // spec
    // 'i18n',
    // 'search',
    'github'
  ],
  // repository: 'picidaejs/picidae-theme-haier',
  repository: {
    repo: remote,
    branch: 'master',
    prefix: '_site/docs'
  },

  search: {
    apiKey: '775577a5c1951d4c202e59d73aa02cef',
    indexName: 'haier'
  },

  style: {
    loadingColor: '#dd2f3d',
    themeColor: '#2265b1'
  },

  footer: {
    organization: {
      to: remote,
      logo: 'https://raw.githubusercontent.com/be-fe/react-mobx-vm/master/logo.svg?sanitize=true'
    },
    copyright: 'Copyright © 2018 - Built by Picidae'
  }
}
