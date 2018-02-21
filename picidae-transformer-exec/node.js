/**
 * @file node
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var cache = require('./lib/cache')
var findNodeModules = require('./lib/findNodeModules')
var nps = require('path')
var md5 = require('md5')
var os = require('os')
var cp = require('child_process')
var fs = require('fs')

var platform = os.platform()
var delimiter = ':'
if (platform === 'win32') {
  delimiter = ';'
}

var modulePath = findNodeModules()
var binPath
if (modulePath) {
  binPath = nps.join(modulePath, '.bin')
}

function extendedEnv(env, paths = []) {
  paths = paths.map(function (p) {
    return nps.resolve(p)
  })
  return Object.assign({}, process.env, {
    PATH: paths.concat(
      [binPath, (process.env.PATH || '')]
    ).join(delimiter)
  }, env)
}

function getOptions(options) {
  return Object.assign({
    cache: true,
    env: {},
    paths: [],
    cwd: 'curr' // file | path/to/cwd
  }, options)
}

function getFilename(gift) {
  var filesMap = gift.filesMap
  var path = gift.path
  return filesMap[path]
}

function getCwd(cwd, gift) {
  var filename = getFilename(gift)

  if (typeof cwd !== 'string') {
    throw TypeError('[picidae-transformer-exec] options.cwd requires string.')
  }
  switch(cwd) {
  case 'curr':
    cwd = process.cwd()
    break
  case 'file':
    cwd = nps.dirname(filename)
    break
  default:
    cwd = nps.resolve(cwd)
  }
  if (!fs.existsSync(cwd) || !fs.statSync(cwd).isDirectory()) {
    console.error('[picidae-transformer-exec] Error: ', cwd, 'is illegal.')
  }
  return cwd
}

/**
 * @description
 *  Firstly, get filename as cache key from gift when cache is on.
 *  And calculate the hash by content to hit cache.
 *  If check the hash is updated, continue. otherwise break
 *  Then, try to match `<EXEC cmd>` placeholder.
 *  execute `cmd` and get the stdout to replace the placeholder
 */
function convert(cwd, options, content) {
  var hitted = false
  var newContent = content.replace(/<<EXEC (.+?)>>/g, function (_, command) {
    hitted = true
    return cp.execSync(command, {
      env: extendedEnv(options.env, options.paths),
      cwd: cwd
    }).toString()
  })
  return hitted && newContent
}

exports.markdownTransformer = function (options, gift, require) {
  options = getOptions(options)
  var cwd = getCwd(options.cwd, gift)
  var filename = getFilename(gift)
  var content = gift.data
  var receivedHash = md5(content)
  var cached = cache[filename]
  var converted

  if (cached && options.cache) {
    if (cached.hash === receivedHash) {
      console.log('[exec]:', filename, 'cache works!')
      return cached.convertedContent
    }
  }

  converted = convert(cwd, options, content)
  if (converted) {
    if (options.cache) {
      cache[filename] = {
        hash: receivedHash,
        convertedContent: converted
      }
    }

    return converted
  }

  return gift.data
}
