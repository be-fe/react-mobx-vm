#!/usr/bin/env bash
COMMON_ARG=" \
--format md \
--github \
--project-homepage \
--project-version \
--project-name \
--project-name \
--shallow \
--config documentation.yml \
-o "

eval "documentation build src/decorator/index.js "$COMMON_ARG" docs/api/decorator.md"
eval "documentation build src/extension/**/*.js "$COMMON_ARG" docs/api/extension.md"
eval "documentation build src/Model/index.js "$COMMON_ARG" docs/api/Model.md"
eval "documentation build src/renderer/**/*.js "$COMMON_ARG" docs/api/renderer.md"
eval "documentation build src/utils/**/*.js "$COMMON_ARG" docs/api/utils.md"
