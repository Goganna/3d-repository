const { src, dest, watch, series} = require('gulp')
const browserSync = require('browser-sync').create
//const terser = require('gulp-terser')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const csso = require('gulp-csso')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const server = require('browser-sync')
const imagemin = require('gulp-imagemin')
const svgstore = require('gulp-svgstore')
const pipeline = require('readable-stream').pipeline
const uglify = require('gulp-uigly-es').default
const del = require('del')
const { sync } = require('del')

function browsersync() {
    browserSync.init({
        server: {baseDir: 'source/'},
        notify: false,
        online: true
    })
}

function html () {
    return src('source/*.html')
         .pipe(dest('build'))
 }

function js () {
    return pipeline (
        src('source/js/*.js'),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write("."),
        rename({suffix: ".min"}),
        dest('build/js'))
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
function cssNomin() {
    return src('source/scss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest('build/css'))
}
function serve () {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    })
    watch('source/scss/**/*.sccs', series(css, cssNomin, refresh))
    watch('source/*.html', series(html, refresh))
}
function refresh (done) {
    server.reload()
    done()
}

function images () {
    return src('source/img/*.{png,ipg,ipeg}')
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({progressive: true})
    ]))
    .pipe(dest("build/img"))
}
function sprite () {
    return src('source/img/icon-*.svg')
        .pipe(imagemin([imagemin.svgo()]))
        .pipe(svgstore({
                inlineSvg: true
            }))
    .pipe(rename('sprite.svg'))        
    .pipe(dest('build/img'))
}
function copy () {
    return src([
        "source/fonts/**/*",
        "source/*ico*"
    ],{
        base: "source"
    })
.pipe(dest('build'))
}
function clean () {
    return del('build')
}

exports.browsersync = browsersync
exports.html = html
exports.css = css
exports['css-nomin'] = cssNomin
exports.serve = serve
exports.images = images
exports.sprite = sprite
exports.js = js
exports.start = series(
    clean,
    images,
    copy,
    html,
    css,
    cssNomin,
    sprite,
    js,
    serve
)

