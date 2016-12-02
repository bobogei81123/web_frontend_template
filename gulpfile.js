'use strict';

const CONFIG = require('./config.js');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const del = require('del');
const browserSync = require('browser-sync');
const semantic = require('./semantic/tasks/build');
const path = require('path');

function logError(err) {
    $.util.log($.util.colors.red('[Error]'), err.toString());
    this.emit('end')
}

// Webpack:
// * Compile js
// * Merge js & css into a single file
gulp.task('webpack', () => 
    gulp.src(CONFIG.entry.js)
        .pipe(webpack(require('./webpack.config.js')))
        .on('error', function() {this.emit('end');})
        .pipe(gulp.dest(CONFIG.dist.base))
        .pipe(browserSync.stream())
);

// BrowserSync:
// * Sync browser on changed
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: CONFIG.dist.base,
        },
        //files: ['static/**/*.*'],
        open: false,
    });
});

// BrowserSync:
// * Main html
gulp.task('pug', () =>
    gulp.src(CONFIG.entry.pug)
        .pipe($.pug())
        .on('error', logError)
        .pipe(gulp.dest(CONFIG.dist.base))
        .pipe(browserSync.stream())
);

// Watch file changes
gulp.task('watch', () => {
    gulp.watch([CONFIG.src.pug], ['pug']);
    gulp.watch([
        CONFIG.src.js,
    ], ['webpack']);
});

// Copy libraries (jQuery...) into dist
gulp.task('libs', () => {
    return gulp.src(CONFIG.libs)
               .pipe(gulp.dest(CONFIG.dist.base));
});

gulp.task('clean', () => {
    del([CONFIG.dist.base])
});

// Make semantic
gulp.task('semantic', semantic);

gulp.task('init', ['semantic', 'libs']);

gulp.task('build', ['webpack', 'pug']);

gulp.task('default', ['build', 'browser-sync', 'watch']);
