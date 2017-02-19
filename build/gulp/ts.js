const fs = require('fs');
const ts = require('gulp-typescript');
const gulp = require('gulp');

const tsProject = ts.createProject('./tsconfig.json');
gulp.task('ts', function(){
    return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('./app/'));
});