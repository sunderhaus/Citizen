#!/bin/bash

GULP="$(which gulp)"
GULP="${GULP:-node_modules/gulp/bin/gulp.js}"

npm install &&
$GULP "$@"
