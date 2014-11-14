#!/bin/sh

npm install &&
if [ -z "$*" ]
then
  node node_modules/gulp/bin/gulp.js watch &
  node web.js
elif [ "$1" = "build" ]
then
  node node_modules/gulp/bin/gulp.js
fi
