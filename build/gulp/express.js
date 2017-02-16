const server = require('gulp-express');
const gulp = require('gulp');
const env = require('../../env.json');

gulp.task('express', () => {
    server.run(['--debug', './bin/www'], {
        env: env
    });
})