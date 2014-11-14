var gulp = require('gulp'),
    deploy = require('gulp-gh-pages'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    nib = require('nib');

gulp.task('stylus', function() {
  gulp.src('./app/css/*.styl')
    .pipe(stylus({
        use: nib(),
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

gulp.task('watch', ['default'], function() {
  gulp.watch('./app/css/*.styl', ['stylus']);
});

gulp.task('deploy', ['default'], function() {
  gulp.src('./app/**/*')
    .pipe(deploy());
});

gulp.task('default',['stylus']);
