/**
 * @file picidae.config.js
 * @author Cuttle Cong
 * @date 2018/2/19
 * @description
 */

module.exports = {
  docRoot: './docs',
  theme: 'haier',
  themeConfigsRoot: './theme-configs',

  transformers: [
    './picidae-transformer-exec?' + JSON.stringify({
      env: {
        DOC_ARG: "--format md \
--github \
--project-homepage \
--project-version \
--project-name \
--project-name \
--shallow \
--config documentation.yml \
-o "
      }
    })
  ]
}
