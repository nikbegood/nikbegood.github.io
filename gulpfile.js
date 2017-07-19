const gulp = require('gulp');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const bs = require('browser-sync').create();
const css = require('gulp-css');
const path = {
    html: ['*.html', '_includes/*.html', '_layouts/*.html'],
    css: 'css/**/*.css'
};

gulp.task('jekyll:build',['css'], function(done){
    spawn('jekyll',['build'],{
        shell: true,
        stdio: 'inherit'
    }).on('close', done);
});

gulp.task('browser-sync', ['jekyll:build'], function(){
    bs.init({
        server:{
            baseDir: "_site"
        }
    });
});

gulp.task('css', function () {
    return gulp.src('css/main.css')
        .pipe(css())
        .pipe(gulp.dest('_site/assets/styles/'))
        .pipe(bs.stream())
        .pipe(gulp.dest('assets/styles'));
});

gulp.task('jekyll:rebuild', ['jekyll:build'], function(){
    bs.reload()
});

gulp.task('watch', function(){
    gulp.watch(path.html, ['jekyll:rebuild'])
    gulp.watch(path.css, ['css']);
});

gulp.task('serve', ['browser-sync', 'watch']);