const server = require('gulp-express');
const gulp = require('gulp');

let env;
try {
    env = require('../../env.json');
}
catch (e) {
    console.warn('env not found will search env variables');
}

gulp.task('express', () => {
    server.run(['--inspect','./bin/www'], {
        env: env
    });
})