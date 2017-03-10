require('./build/gulp/express');
require('./build/gulp/ts');
require('./build/gulp/mocha');
require('./build/gulp/mocha');
require('./build/gulp/tslint');

const gulp = require('gulp');
gulp.task('serve', () => {
    gulp.series('tslint', 'ts', 'express')();

    gulp.watch('app/**/*.ts', done => {
        gulp.series('tslint','ts', 'mocha', 'express')();
        done();
    });

});
gulp.task('test', gulp.series('tslint','ts', 'mocha-travis'));


