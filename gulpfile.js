const gulp = require('gulp');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const csso = require('gulp-csso')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')

const html = function() {
   return gulp.src('./source/index.html').pipe(gulp.dest('./build/'));
}
const js = function() {
    return gulp.src('source/js/script.js')
        .pipe(terser())
        .pipe(gulp.dest('./build'))
}
function css () {
    return src('source/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write("./"))
        .pipe(dest('build/css'))
}
exports.html = html
exports.css = css
exports.js = js

