/**
 * @file doc
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */
var documentation = require('documentation')

var mdFormatter = function (comments) {
  console.log(comments)
  return documentation.formats.md.call(this, comments, {

  })
}

documentation
  .build(['../src/index.js'], {
    hljs: {
      highlightAuto: true
    }
  })
  .then(mdFormatter)
  .then(console.log)
  // .then(output => {
  //   // output is a string of Markdown data
  //   fs.writeFileSync('./output.md', output)
  // });
