///////////////////////////////////////
// Required
///////////////////////////////////////
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const htmlclean = require('gulp-htmlclean');
const responsive = require('gulp-responsive');
const uglify = require('gulp-uglifyes');
const sourcemaps = require('gulp-sourcemaps');

var paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  srcAssets: 'src/**/*.{css,png,gif,jpg,jpeg,svg,mp4,webm,ogv}',
  srcScss: 'src/**/*.scss',

  dist: 'dist',
  distIndex: 'dist/index.html',
  distCSS: 'dist/**/*.css',
  distJS: 'dist/**/*.js',
  distAssets: 'dist/**/*.{png,gif,jpg,jpeg,svg,mp4,webm,ogv}',
  distScss: 'dist/**/*.scss'
};

// ///////////////////////////////////////
// // Watch Task
// ///////////////////////////////////////

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp
    .src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// Move the javascript files into /src/js folder
gulp.task('js', function() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/jquery/dist/jquery.js'
    ])
    .pipe(gulp.dest('src/js/libs'))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './src'
  });

  gulp.watch(
    ['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],
    ['sass']
  );
  gulp.watch(['assets/*']['assets:dist']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('watch', ['js', 'serve']);

///////////////////////////////////////
// prefix Task
///////////////////////////////////////
gulp.task('prefix', () =>
  gulp
    .src('src/css/style.css')
    .pipe(
      autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
      })
    )
    .pipe(gulp.dest('src/css'))
);

///////////////////////////////////////
// Default Task
///////////////////////////////////////
gulp.task('html:dist', function() {
  return gulp
    .src(paths.srcHTML)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('css:dist', function() {
  return gulp
    .src(paths.srcCSS)
    .pipe(sourcemaps.init())
    .pipe(concat('style.min.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('js:dist', function() {
  return gulp
    .src('src/js/libs/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('user:js:dist', function() {
  return gulp
    .src('src/js/userscripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('userscripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task('assets:dist', function() {
  return gulp
    .src(paths.srcAssets)
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});

gulp.task(
  'build',
  ['html:dist', 'css:dist', 'js:dist', 'assets:dist', 'user:js:dist'],
  function() {
    var css = gulp.src(paths.distCSS);
    var js = gulp.src(paths.distJS);
    var assets = gulp.src(paths.distAssets);
    return gulp.src(paths.distIndex).pipe(gulp.dest(paths.dist));
  }
);
