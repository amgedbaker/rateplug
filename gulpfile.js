'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

// vars for file paths
var paths = {
  source: 'src/assets/',
  dest: 'build/',
//  bs: './src/assets/js/bootstrap/**/*.js',
  'js': {
    'bootstrap': [
      './src/assets/js/bootstrap/carousel.js',
      './src/assets/js/bootstrap/transition.js',
      './src/assets/js/bootstrap/dropdown.js',
      './src/assets/js/bootstrap/tooltip.js',
      './src/assets/js/bootstrap/popover.js'
    ]
  },
  templates: {
    src: './src/templates/*.html'
  },
  includes: {
    src: './src/includes/**/*.html'
  }
};

// file include
gulp.task('fileinclude', function() {

  // where the includes compile to
  gulp.src(['./src/templates/*.html'])
    .pipe(fileinclude({

      // prefix for included file in template
      prefix: '@@',

      // path prefix for where the includes are
      basepath: './src/includes/'
    }))

    // where the template compiles to
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

gulp.task('include-watch', ['fileinclude'], reload);


// process JS files and return to the stream
gulp.task('scripts', function() {
  gulp.src(paths.source + 'js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('js-watch', ['scripts'], reload);

// process bootstrap's JS files.
// note: if you add another file to the array above, you must restart gulp.
gulp.task('bootstrapJS', function() {
  console.log('bootstrap', paths.bs)
  gulp.src(paths.js.bootstrap)
    .pipe(concat('bootstrap.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('bootstrapJS-watch', ['bootstrapJS'], reload);

// minify css
gulp.task('sass', function() {
  console.log('sasss')
  return gulp.src(paths.source + 'scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['defaults', 'last 2 versions', 'Firefox > 45', '> 1% in US'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.dest + '/css'))
    .pipe(browserSync.stream());
});



// compress images
gulp.task('smush', function() {
  gulp.src('src/assets/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'))
});


gulp.task('default', ['fileinclude', 'scripts', 'bootstrapJS', 'sass'], function () {
    // serve files from the build folder
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    // watch files and run tasks
    gulp.watch(paths.includes.src, ['include-watch']);
    gulp.watch(paths.templates.src, ['include-watch']);
    gulp.watch(paths.source + 'js/*.js', ['js-watch']);
    gulp.watch(paths.source + 'scss/**/*.scss', ['sass']);
    gulp.watch(paths.bs, ['bootstrapJS-watch']);
});

