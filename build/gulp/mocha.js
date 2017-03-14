const gulp = require('gulp');
const mocha = require('gulp-mocha');
const cover = require('gulp-coverage');
const gulp_env = require('gulp-env');
const coveralls = require('gulp-coveralls');

let env;
try {
    env = require('../../env.json');
}
catch (e) {
    console.warn('env not found will search env variables');
}

gulp.task('mocha', () => {
    return gulp.src(['**/*.spec.js', '!node_modules/**'], { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        // .pipe(cover.instrument({
        //     pattern: ['**/*.js', '!node_modules/**', '!**/*.spec.js'],

        // }))
        .pipe(gulp_env({
            vars: env
        }))
        .pipe(mocha({ reporter: 'nyan' }));
        // .pipe(cover.gather())
        // .pipe(cover.format({ reporter: 'html' }))
        // .pipe(gulp.dest('reports'));
});

gulp.task('mocha-travis', () => {
    return gulp.src(['**/*.spec.js', '!node_modules/**'], { read: false })
        // .pipe(cover.instrument({
        //     pattern: ['**/*.js', '!node_modules/**', '!**/*.spec.js'],

        // }))
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({ reporter: 'min' }))
        // .pipe(cover.gather())
        .pipe(gulp_env({
            vars: env
        }));
        // .pipe(cover.format({ reporter: 'lcov' }))
        // .pipe(gulp.dest('reports'))
        // .pipe(coveralls());
});