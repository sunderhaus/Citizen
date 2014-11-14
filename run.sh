#!/bin/sh

npm install &&
node node_modules/gulp/bin/gulp.js watch &
node web.js
