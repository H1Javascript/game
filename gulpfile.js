var dev         = "app_dev";
var prod        = "app_prod";

var gulp        = require('gulp'),
    compass     = require('gulp-for-compass'),
    useref      = require('gulp-useref'),
    clean       = require('gulp-clean'),
    serve       = require('gulp-serve');


// Serveur Web
gulp.task('serve', serve('app_prod'));


// Compile SASS
gulp.task('compass', function () {
    return gulp.src(dev +'/resources/scss/*.scss')
      .pipe(compass({
        sassDir: dev +'/resources/scss',
        cssDir: prod +'/styles',
        outputStyle: 'compressed'
      }));
});


// Compile JS from HTML tags
gulp.task('compile', function () {
    var assets = useref.assets();

    return gulp.src(dev +'/*.html')
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(prod));
});


// Move files to prod without changing them
gulp.task('moveViews', ['cleanViews'], function () {
  return gulp.src(dev +"/src/Views/**/*")
    .pipe(gulp.dest(prod +'/libraries/views'));
});


// Clean directories
gulp.task('cleanViews', function () {
  return gulp.src(prod +"/libraries/views")
    .pipe(clean());
});


// Move files to prod without changing them
gulp.task('moveFont', ['cleanFont'], function () {
  return gulp.src(dev +"/resources/fonts/**/*")
    .pipe(gulp.dest(prod +'/resources/fonts'));
});


// Clean directories
gulp.task('cleanFont', function () {
  return gulp.src(prod +"/resources/fonts")
    .pipe(clean());
});


// Move files to prod without changing them
gulp.task('moveImages', ['cleanImages'], function () {
  return gulp.src(dev +"/resources/images/**/*")
    .pipe(gulp.dest(prod +'/resources/images'));
});


// Clean directories
gulp.task('cleanImages', function () {
  return gulp.src(prod +"/resources/images")
    .pipe(clean());
});


// Move files to prod without changing them
gulp.task('movePartitions', ['cleanPartitions'], function () {
  return gulp.src(dev +"/resources/partitions/**/*")
    .pipe(gulp.dest(prod +'/resources/partitions'));
});


// Clean directories
gulp.task('cleanPartitions', function () {
  return gulp.src(prod +"/resources/partitions")
    .pipe(clean());
});


// Production task
gulp.task('prod', ['compass', 'compile', 'moveViews', 'moveImages', 'movePartitions', 'moveFont'], function () {});
