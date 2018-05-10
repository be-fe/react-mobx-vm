<img src="./logo.svg" alt="logo" height="120" align="right" />

# react-mobx-vm

View & Model are mixed now via react mobx

[![build status](https://img.shields.io/travis/be-fe/react-mobx-vm/master.svg?style=flat-square)](https://travis-ci.org/be-fe/react-mobx-vm)
[![Test coverage](https://img.shields.io/codecov/c/github/be-fe/react-mobx-vm.svg?style=flat-square)](https://codecov.io/github/be-fe/react-mobx-vm?branch=master)
[![NPM version](https://img.shields.io/npm/v/react-mobx-vm.svg?style=flat-square)](https://www.npmjs.com/package/react-mobx-vm)
[![NPM Downloads](https://img.shields.io/npm/dm/react-mobx-vm.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/react-mobx-vm)
[test e2e](https://dashboard.cypress.io/#/projects/runs)

- UMD `reactMobxVM`
  - https://unpkg.com/react-mobx-vm
  - https://cdn.jsdelivr.net/npm/react-mobx-vm

Note: UMD don't supports extension/Router.

## Installation
```bash
npm i react react-router@3 mobx@3 mobx-react@4 react-mobx-vm -D
```

## Examples

```bash
git clone ...
cd react-mobx-vm
npm install
npm run gojs:open -- -i routerV3/browserHistory.js 
```

## Tests
### Units
```bash
npm test
```

### Integration
```bash
npm run test:cy:run
# or 
npm run test:cy:open
```

## Contributing

- The commit message should observe the [rule](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html).
