require('./build/gulp/express');
require('./build/gulp/ts');
require('./build/gulp/mocha');

const gulp = require('gulp');
gulp.task('serve', gulp.series('ts', 'mocha', 'express'));
gulp.task('test', gulp.series('ts', 'mocha'));

gulp.watch('**/*.ts', done => {
    gulp.series('ts', 'mocha', 'express')();
    done();
});

