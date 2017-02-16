const server = require('gulp-express');
const gulp = require('gulp');

const env
try {
    env = require('../../env.json');
}
catch (e) {
    console.warn('env not found will search env variables');
}

gulp.task('express', () => {
    server.run(['--debug', './bin/www'], {
        env: env
    });
})