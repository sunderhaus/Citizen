#!/bin/bash

GULP="$(which gulp)"
GULP="${GULP:-node_modules/gulp/bin/gulp.js}"

npm install &&
if [[ -z "$*" || "server" == "$1"* ]]
then
  $GULP
elif [[ "build" == "$1"* ]]
then
  $GULP build
elif [[ "deploy" == "$1"* ]]
then
  $GULP deploy
else
  printf 'Unrecognized option: `%s`

Usage: %s [GULP_TARGET]
Where GULP_TARGET matches:
  server	Run app watching for changes (default)
  build		Build app
  deploy	Build and deploy to gh-pages
' "$1" "$0"
fi
