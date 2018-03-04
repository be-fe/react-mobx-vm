#!/usr/bin/env node
/**
 * @file doc
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var documentation = require('documentation-fork')
var argv = require('minimist')(process.argv.slice(2))

var mdFormatter = function (comments) {
  if (!Array.isArray(comments)) {
    comments = [comments]
  }
  // console.error(comments.tags)
  // console.error(comments.context)

  comments = comments.sort(function (a, b) {
    var aName = a.name || ''
    var bName = b.name || ''
    return aName.localeCompare(bName)
  })
  comments = comments.map(function (comment) {
    delete comment.author
    if (comment.errors && comment.errors.length) {
      console.error(
        'ERROR:\n'
        + comment.errors.map(function (c) { return c.message }).join('\n')
        + '\n'
      )
    }
    return comment
  })

  return documentation.formats.md.call(this, comments)
}

var paths = argv._

var opt = {
  shallow: 's' in argv ? !!argv.s : false
}

documentation
  .build(paths, {
    hljs: {
      highlightAuto: true
    },
    shallow: opt.shallow,
    access: ['public'],
    github: true
  })
  .then(mdFormatter)
  .then(output => {
    // break line for gfm
    console.log(output.split('\n').map(line => line.trimRight()).join('  \n'))
  })
  // .then(output => {
  //   // output is a string of Markdown data
  //   fs.writeFileSync('./output.md', output)
  // });
