const gulp = require('gulp')

const html = require('./html');
const styles = require('./sass2css')
const jquery = require('./jquery')
const files = require('./files')
const script = require('./script')
const imageMinify = require('./imgmin')
const fonts = require('./fonts')
let devip = require('dev-ip');
const server = require('browser-sync').create()
let reload = server.reload;

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports = function localServer(cb) {
    server.init({
        watch: true,
        server: true,
        notify: false,
        open: true,
        cors: true,
        online: true,
        host: devip[0],
        directory: true
    })

    gulp.watch('src/images/**/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify, readyReload))
    // gulp.watch('src/img/sprite/*.svg', gulp.series(svgSprite, readyReload))
    gulp.watch('src/**/*.html', gulp.series(html, cb => gulp.src('dist/').pipe(server.stream()).on('end', cb)))
    gulp.watch('src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('dist/css').pipe(server.stream()).on('end', cb)))
    gulp.watch('src/js/*.js', gulp.series(script, readyReload))
    gulp.watch('src/jquery/*.js', gulp.series(jquery, readyReload))
    gulp.watch('src/fonts/*', gulp.series(fonts, readyReload))
    gulp.watch('src/files/*', gulp.series(files, readyReload))
    // gulp.watch('src/pages/**/*.pug', gulp.series(pug2html, readyReload))
    // gulp.watch('package.json', gulp.series(copyDependencies, readyReload))
    gulp.watch("*.html").on("change", reload)

    return cb()
}