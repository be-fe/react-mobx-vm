const version = require('../package.json').version
const cc = require('conventional-changelog')
const file = `./release_notes/RELEASE_NOTE${version ? `_${version}` : ''}.md`
const fileStream = require('fs').createWriteStream(file)

cc({
  preset: 'angular',
  pkg: {
    transform (pkg) {
      pkg.version = `v${version}`
      return pkg
    }
  }
}).pipe(fileStream).on('close', () => {
  console.log(`Generated release note at ${file}`)
})