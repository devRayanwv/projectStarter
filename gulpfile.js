var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var del = require('del');

gulp.task('styles', function(){
  gulp.src('src/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());

  gulp.src('src/css/**/*.css')
  .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
  gulp.src('src/js/**/*.js')
  .pipe(gulp.dest('dist/scripts'));
});
gulp.task('useref', function(){
  return gulp.src('src/*.html')
  .pipe(useref({searchPath: ['src', '.']}))
  .pipe(gulp.dest('dist'))
});
gulp.task('fonts', function(){
  return gulp.src(['bower_components/bootstrap-sass/assets/fonts/bootstrap/**.*',
  'bower_components/font-awesome/fonts/**.*'
])
    .pipe(gulp.dest('dist/fonts'))
    .pipe(gulp.dest('src/fonts'));
});

gulp.task('serve', ['styles'], function(){
  browserSync.init({
    port:8881,
    server: {
      baseDir: ['src'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });
  gulp.watch('src/sass/**/*.scss', ['styles']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
});

gulp.task('serve:dist', function(){
  browserSync.init({
    port:8881,
    server: {
      baseDir: ['dist']
    }
  });
});
// This task to empty the dist folder
gulp.task('clean', function(){
  return del(['dist/**/*']);
});

gulp.task('build:dist', ['clean', 'styles', 'scripts', 'useref', 'fonts'])
{

}
