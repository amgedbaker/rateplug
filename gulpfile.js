'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch');

// make vars for file paths
var paths = {
  source: 'src/assets/',
  dest: 'docs/',
  'js': {
    'bootstrap': [
      './src/assets/js/bootstrap/affix.js',
      './src/assets/js/bootstrap/alert.js',
      './src/assets/js/bootstrap/offcanvas.js'
    ]
  }
};

gulp.task('bootstrapJS', function() {
  gulp.src(paths.js.bootstrap)
    .pipe(concat('bootstrap.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + 'js'))
    .pipe(connect.reload())
});

gulp.task('scripts', function() {
  gulp.src(paths.source + 'js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + 'js'))
    .pipe(connect.reload())
});


gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src('**/*.html')
  .pipe(connect.reload())
});

// compress images
gulp.task('smush', function() {
  gulp.src('src/assets/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('docs/images'))
});

// minify css
gulp.task('sass', function() {
  return gulp.src(paths.source + 'scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['defaults', 'last 2 versions', 'Firefox > 45', '> 1% in US'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.dest + '/css'))
});

// watch for changes in css and js then compile
gulp.task('watch', function() {
  gulp.watch(paths.source + 'scss/**/*.scss', ['sass']);
  gulp.watch(paths.source + 'js/*.js', ['scripts']);
  gulp.watch('**/*.html', ['html']);
});

gulp.task('default', ['sass', 'bootstrapJS', 'scripts', 'connect', 'watch']);