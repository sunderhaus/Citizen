/* project settings */

var port = process.env.PORT || 8000,
    host = 'localhost.citizen.com';


/* node.js modules */

var gulp = require('gulp'),
    deploy = require('gulp-gh-pages'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    axis = require('axis'),
    webserver = require('gulp-webserver');


/* gulp.js tasks */

gulp.task('css', function() {
  gulp.src('./app/css/*.styl')
    .pipe(stylus({
        use: axis(),
        compress: true,
        sourcemap: {
          sourceRoot: '.',
          basePath: './app/css',
          inline: true
        }
      }))
    .pipe(sourcemaps.init({
        loadMaps: true
      }))
    .pipe(sourcemaps.write({
        includeContent: false,
        sourceRoot: '.'
      }))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('build',['css']);

gulp.task('deploy', ['build'], function() {
  gulp.src('./app/**/*')
    .pipe(deploy());
});

gulp.task('server', ['build'], function() {
  gulp.watch('./app/css/*.styl', ['css']);
  gulp.src('./app')
    .pipe(webserver({
      host: host,
      port: port,
      livereload: true,
      open: true
    }));
});
/* Catch Error: getaddrinfo ENOTFOUND */
process.on('uncaughtException', function (err) {
  if(err.errno === 'ENOTFOUND' && err.syscall === 'getaddrinfo') {
    console.log('\nAdd the following line to your system HOSTS file:\n127.0.0.1	' + host);
  }
  process.exit(1);
});

gulp.task('default', ['server']);
