/**
 * @file picidae-theme-haier
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var nps = require('path')
var remoteOriginUrl = require('remote-origin-url')
var remote = remoteOriginUrl.sync(nps.join(__dirname, '..'))
if (remote) {
  remote = remote.replace(/\.git$/, '')
}
else {
  remote = 'https://github.com/imcuttle/react-mobx-vm'
}

module.exports = {
  logo: {
    src: remote + '/raw/master/logo.svg',
    name: 'React Mobx VM'
  },

  // work on title
  description: '🍔 The universal picidae theme for project / library / framework etc.',

  headers: [
    'docs',
    'api',
    /*'blog',*/
    // spec
    'i18n',
    'search',
    'github'
  ],
  // repository: 'picidaejs/picidae-theme-haier',
  repository: {
    repo: remote,
    branch: 'master',
    prefix: 'docs'
  },

  search: {
    apiKey: '775577a5c1951d4c202e59d73aa02cef',
    indexName: 'haier'
  },

  style: {
    loadingColor: '#dd2f3d'
    // themeColor
  },

  footer: {
    organization: {
      to: 'https://github.com/picidaejs/picidaejs',
      logo: 'https://github.com/picidaejs/picidaejs/raw/master/logo/picidae-2x.png'
    },
    copyright: 'Copyright © 2018 - Built by Picidae'
  }
}
