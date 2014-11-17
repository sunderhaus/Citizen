var gulp = require('gulp'),
    deploy = require('gulp-gh-pages'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    axis = require('axis'),
    webserver = require('gulp-webserver'),
    port = process.env.PORT || 8000;

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
      port: port,
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['server']);
