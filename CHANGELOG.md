<a name="0.2.1"></a>
## [0.2.1](https://github.com/be-fe/react-mobx-vm/compare/v0.2.0...v0.2.1) (2018-11-10)


### Bug Fixes

* error in react decorator ([60b5b8b](https://github.com/be-fe/react-mobx-vm/commit/60b5b8b))
* vm-render support props which is not extensible ([d7aaf61](https://github.com/be-fe/react-mobx-vm/commit/d7aaf61))


### Performance Improvements

* reduce unnecessary data sync method for urlSync / storageSync ([2a7d16c](https://github.com/be-fe/react-mobx-vm/commit/2a7d16c))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/be-fe/react-mobx-vm/compare/v0.1.14...v0.2.0) (2018-06-12)


### Bug Fixes

* **urlsync:** use history.replace instead of history.push ([77541f3](https://github.com/be-fe/react-mobx-vm/commit/77541f3))


### BREAKING CHANGES

* **urlsync:** use history.replace instead of history.push



<a name="0.1.14"></a>
## [0.1.14](https://github.com/be-fe/react-mobx-vm/compare/v0.1.13...v0.1.14) (2018-05-14)



<a name="0.1.13"></a>
## [0.1.13](https://github.com/be-fe/react-mobx-vm/compare/v0.1.12...v0.1.13) (2018-05-10)



<a name="0.1.12"></a>
## [0.1.12](https://github.com/be-fe/react-mobx-vm/compare/v0.1.11...v0.1.12) (2018-04-23)


### Bug Fixes

* urlSync value toJSON ([d627e7f](https://github.com/be-fe/react-mobx-vm/commit/d627e7f))


### Performance Improvements

* append List model ([b94ea07](https://github.com/be-fe/react-mobx-vm/commit/b94ea07))



<a name="0.1.11"></a>
## [0.1.11](https://github.com/be-fe/react-mobx-vm/compare/v0.1.10...v0.1.11) (2018-04-16)


### Bug Fixes

* fix IE<=10 class static properties assign ([9bdfe9a](https://github.com/be-fe/react-mobx-vm/commit/9bdfe9a))



<a name="0.1.10"></a>
## [0.1.10](https://github.com/be-fe/react-mobx-vm/compare/v0.1.9...v0.1.10) (2018-03-26)


### Bug Fixes

* stateLifeDecorator options ([182c889](https://github.com/be-fe/react-mobx-vm/commit/182c889))



<a name="0.1.9"></a>
## [0.1.9](https://github.com/be-fe/react-mobx-vm/compare/v0.1.8...v0.1.9) (2018-03-22)


### Bug Fixes

* stateSync can't works on ObservableArray ([9c7be27](https://github.com/be-fe/react-mobx-vm/commit/9c7be27))


### Performance Improvements

* setSymbolic add assert path logic ([40e85b7](https://github.com/be-fe/react-mobx-vm/commit/40e85b7))



<a name="0.1.8"></a>
## [0.1.8](https://github.com/be-fe/react-mobx-vm/compare/v0.1.7...v0.1.8) (2018-03-20)


### Performance Improvements

* **root:** root inject viewid ([af65f8c](https://github.com/be-fe/react-mobx-vm/commit/af65f8c))
* root constructor initialize viewId ([ce6ae9d](https://github.com/be-fe/react-mobx-vm/commit/ce6ae9d))



<a name="0.1.7"></a>
## [0.1.7](https://github.com/be-fe/react-mobx-vm/compare/v0.1.6...v0.1.7) (2018-03-19)



<a name="0.1.6"></a>
## [0.1.6](https://github.com/be-fe/react-mobx-vm/compare/v0.1.6-0...v0.1.6) (2018-03-19)


### Bug Fixes

* symbolicLink use in [@observable](https://github.com/observable) ([bc51cae](https://github.com/be-fe/react-mobx-vm/commit/bc51cae))



<a name="0.1.6-0"></a>
## [0.1.6-0](https://github.com/be-fe/react-mobx-vm/compare/v0.1.5-0...v0.1.6-0) (2018-03-16)


### Features

* add SymbolicCustom ([a904a8c](https://github.com/be-fe/react-mobx-vm/commit/a904a8c))



<a name="0.1.5-0"></a>
## [0.1.5-0](https://github.com/be-fe/react-mobx-vm/compare/v0.1.4...v0.1.5-0) (2018-03-16)


### Features

* add SymbolicLink, thanks [@jspopno1](https://github.com/jspopno1) ([e145231](https://github.com/be-fe/react-mobx-vm/commit/e145231))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/be-fe/react-mobx-vm/compare/v0.1.3...v0.1.4) (2018-03-12)


### Bug Fixes

* urlSync inheritance bug: side effect on parent ([96b5d9c](https://github.com/be-fe/react-mobx-vm/commit/96b5d9c))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/be-fe/react-mobx-vm/compare/v0.1.2...v0.1.3) (2018-03-10)


### Bug Fixes

* stateLife run update before other init hooks ([07251c6](https://github.com/be-fe/react-mobx-vm/commit/07251c6))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/be-fe/react-mobx-vm/compare/v0.1.1...v0.1.2) (2018-03-10)


### Bug Fixes

* fix mapping allow not existed prop ([bfaffa5](https://github.com/be-fe/react-mobx-vm/commit/bfaffa5))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/be-fe/react-mobx-vm/compare/v0.1.0...v0.1.1) (2018-03-10)


### Bug Fixes

* fix getStateLifeDecorator bug about check target[property] ([db14cff](https://github.com/be-fe/react-mobx-vm/commit/db14cff))
* urlSync assignState supports array / object assign ([e54ee20](https://github.com/be-fe/react-mobx-vm/commit/e54ee20))
* urlsync hooks bug ([68fd746](https://github.com/be-fe/react-mobx-vm/commit/68fd746))


### Features

* urlSync supports inheritance! 💥 ([981f0c6](https://github.com/be-fe/react-mobx-vm/commit/981f0c6))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/be-fe/react-mobx-vm/compare/v0.0.19...v0.1.0) (2018-03-08)


### Bug Fixes

* urlsync assign state donot update ref ([ecdd0dc](https://github.com/be-fe/react-mobx-vm/commit/ecdd0dc))
* urlsync assignState ([eda851c](https://github.com/be-fe/react-mobx-vm/commit/eda851c))


### Code Refactoring

* Root#assignShallow allow `undefined` setted ([b5f25aa](https://github.com/be-fe/react-mobx-vm/commit/b5f25aa))


### BREAKING CHANGES

* Root#assignShallow allow `undefined` setted



<a name="0.0.19"></a>
## [0.0.19](https://github.com/be-fe/react-mobx-vm/compare/v0.0.18...v0.0.19) (2018-03-07)


### Bug Fixes

* fix the execute order about autorun dispose ([8820866](https://github.com/be-fe/react-mobx-vm/commit/8820866))


### Features

* Root#toJSON supports nested ([98d6a3a](https://github.com/be-fe/react-mobx-vm/commit/98d6a3a))


### Reverts

* revert urlSync's logic ([8a67921](https://github.com/be-fe/react-mobx-vm/commit/8a67921))



<a name="0.0.18"></a>
## [0.0.18](https://github.com/be-fe/react-mobx-vm/compare/v0.0.17...v0.0.18) (2018-03-07)



<a name="0.0.17"></a>
## [0.0.17](https://github.com/be-fe/react-mobx-vm/compare/v0.0.16...v0.0.17) (2018-03-07)


### Performance Improvements

* **bindable:** the before onChange could async return false ([38837f1](https://github.com/be-fe/react-mobx-vm/commit/38837f1))



<a name="0.0.16"></a>
## [0.0.16](https://github.com/be-fe/react-mobx-vm/compare/v0.0.15...v0.0.16) (2018-03-06)


### Features

* Root#assignShallow supports nested Root instance ([4e67065](https://github.com/be-fe/react-mobx-vm/commit/4e67065))



<a name="0.0.15"></a>
## [0.0.15](https://github.com/be-fe/react-mobx-vm/compare/v0.0.14...v0.0.15) (2018-03-05)


### Performance Improvements

* **bindable:** refactor the arguments of bindable `event` option ([a9fc49a](https://github.com/be-fe/react-mobx-vm/commit/a9fc49a))


### BREAKING CHANGES

* **bindable:** the bindable's option.event use array type to the first argument



<a name="0.0.14"></a>
## [0.0.14](https://github.com/be-fe/react-mobx-vm/compare/v0.0.13...v0.0.14) (2018-03-05)


### Bug Fixes

* fix injectExt name ([82ff7ca](https://github.com/be-fe/react-mobx-vm/commit/82ff7ca))



<a name="0.0.13"></a>
## [0.0.13](https://github.com/be-fe/react-mobx-vm/compare/v0.0.12...v0.0.13) (2018-03-04)


### Performance Improvements

* make `qs` to be external on `cjs/es` ([5577914](https://github.com/be-fe/react-mobx-vm/commit/5577914))



<a name="0.0.12"></a>
## [0.0.12](https://github.com/be-fe/react-mobx-vm/compare/v0.0.11...v0.0.12) (2018-03-02)


### Features

* collect supports `collect(app, 'path')` to reset ([97de2d4](https://github.com/be-fe/react-mobx-vm/commit/97de2d4))



<a name="0.0.11"></a>
## [0.0.11](https://github.com/be-fe/react-mobx-vm/compare/v0.0.10...v0.0.11) (2018-03-01)



<a name="0.0.10"></a>
## [0.0.10](https://github.com/be-fe/react-mobx-vm/compare/v0.0.9...v0.0.10) (2018-02-22)


### Bug Fixes

* packages/RouterV3 supports props.createElement ([4db9236](https://github.com/be-fe/react-mobx-vm/commit/4db9236))



<a name="0.0.9"></a>
## [0.0.9](https://github.com/be-fe/react-mobx-vm/compare/v0.0.8...v0.0.9) (2018-02-22)


### Bug Fixes

* don't complie the packages ([7a6fa7d](https://github.com/be-fe/react-mobx-vm/commit/7a6fa7d))



<a name="0.0.8"></a>
## [0.0.8](https://github.com/be-fe/react-mobx-vm/compare/v0.0.7...v0.0.8) (2018-02-22)


### Features

* support props.createElement ([0f878d6](https://github.com/be-fe/react-mobx-vm/commit/0f878d6))



<a name="0.0.7"></a>
## [0.0.7](https://github.com/be-fe/react-mobx-vm/compare/v0.0.6...v0.0.7) (2018-02-22)


### Bug Fixes

* remove prepare run babel ([63c2e8d](https://github.com/be-fe/react-mobx-vm/commit/63c2e8d))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/be-fe/react-mobx-vm/compare/v0.0.5...v0.0.6) (2018-02-22)



<a name="0.0.5"></a>
## [0.0.5](https://github.com/be-fe/react-mobx-vm/compare/v0.0.4...v0.0.5) (2018-02-22)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/be-fe/react-mobx-vm/compare/v0.0.3...v0.0.4) (2018-02-21)



<a name="0.0.3"></a>
## [0.0.3](https://github.com/be-fe/react-mobx-vm/compare/v0.0.2...v0.0.3) (2018-02-21)



<a name="0.0.2"></a>
## [0.0.2](https://github.com/be-fe/react-mobx-vm/compare/v0.0.1...v0.0.2) (2018-02-21)



<a name="0.0.1"></a>
## 0.0.1 (2018-02-21)



