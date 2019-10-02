const gulp         = require('gulp');
const rename       = require('gulp-rename');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps   = require('gulp-sourcemaps');

const srcDir = './assets/';
const destDir = './dist/';

gulp.task('sass', function(done) {
    gulp.src(srcDir + 'scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destDir + 'css/'));

    done();
});

gulp.task('watch', function() {
    gulp.watch(srcDir + 'scss/**/*.scss', gulp.parallel('sass'));
});

gulp.task('build', gulp.parallel('sass'));

gulp.task('default', gulp.series('watch'));
