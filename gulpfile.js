var APP_NAME = 'Cover Your Assets';

var gulp = require('gulp');
var runSequence = require('gulp-run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var inject = require("gulp-inject");
var clean = require('gulp-clean');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var path = require('path');
var merge = require('merge-stream');
var prefix = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var wrap = require("gulp-wrap");
var sourcemaps = require('gulp-sourcemaps');
var wrapJS = require('gulp-wrap-js');
var angularTemplateCache = require('gulp-angular-templatecache');


var paths = {
  views: ['app/**/*.html'],
  sass: ['scss/**/*.scss'],
  less: ['less/**/*.less'],
  es6: ['app/app.js', 'app/**/*.js'],
  scripts: [
    'www/js/lib/**/*.js',
    'www/js/app.js',
    'www/js/**/*.js'
  ],
  styles: ['www/css/importer.css'],
  fonts: ['www/components/ionic/scss/ionicons/**/*', 'fonts/**/*']
};

function extname(file) {
  return path.extname(file).slice(1);
}

gulp.task('clean', function() {
  var paths = ['www/index.html', 'www/css/**/*.css', 'www/js/', 'www/**/*.html'];
  return gulp.src(paths, {read: false})
    .pipe(clean());
});

gulp.task('views', function() {
  return gulp.src(paths.views)
    .pipe(gulp.dest('www'));
});

gulp.task('less', function(done) {
  return gulp.src('./less/importer.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(prefix('last 2 Chrome versions', 'last 2 iOS versions', 'last 2 Android versions'))
    .pipe(gulp.dest('www/css'))
});

gulp.task('sass', function() {
  return gulp.src('scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('www/css'));
});

gulp.task('compileJS', function() {
  return gulp.src(paths.es6)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(wrapJS('(function(){\n{%= body %}\n})();'))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('www/js'));
});

gulp.task('watch', function() {
  gulp.watch([paths.sass, paths.less], ['sass', 'less']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.es6, ['compileJS']);
  gulp.watch(paths.views, ['views']);
});

gulp.task('default', ['views', 'sass', 'less', 'compileJS', 'watch']);
