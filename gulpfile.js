var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    stylus = require('gulp-stylus'),
    nib = require('nib');

gulp.task('stylus', function() {
  gulp.src('./app/css/*.styl')
    .pipe(
      stylus({
        use: nib(),
        compress: true
      }))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('default',['stylus']);
