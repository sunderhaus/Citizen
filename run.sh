#!/bin/bash

npm install &&
if [[ -z "$*" || "server" == "$1"* ]]
then
  node node_modules/gulp/bin/gulp.js watch &
  node web.js
elif [[ "build" == "$1"* ]]
then
  node node_modules/gulp/bin/gulp.js
else
  printf 'Unrecognized option: `%s`

Usage: %s [TARGET]
Where TARGET (partially) matches:
  server	Run app watching for changes (default)
  build		Build app for deployment
' "$1" "$0"
fi
