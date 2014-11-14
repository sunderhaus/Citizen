#!/bin/sh

npm install &&
node node_modules/gulp/bin/gulp.js &&
node web.js
