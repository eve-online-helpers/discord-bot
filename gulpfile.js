require('./gulp/express');
require('./gulp/ts');
require('./gulp/mocha');

const gulp = require('gulp');
gulp.task('serve', gulp.series('ts', 'mocha', 'express'));
gulp.watch('**/*.ts', done => {
    gulp.series('ts', 'mocha', 'express')();
    done();
});

