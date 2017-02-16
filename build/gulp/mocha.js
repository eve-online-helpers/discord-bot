const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('mocha', () => {
    return gulp.src(['**/*.spec.js', '!node_modules/**'], { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({ reporter: 'nyan' }))
});

gulp.task('mocha-travis', () => {
    return gulp.src(['**/*.spec.js', '!node_modules/**'], { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({ reporter: 'min' }))
});