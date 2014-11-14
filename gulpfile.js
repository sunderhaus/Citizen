var gulp = require('gulp'),
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

gulp.task('default',['stylus']);
