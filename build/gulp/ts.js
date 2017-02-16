const fs = require('fs');
const ts = require('gulp-typescript');
const gulp = require('gulp');

const tsProject = ts.createProject('./tsconfig.json');
gulp.task('ts', ()=>{
    return gulp.src(['./**/*.ts', '!./node_modules/**'])
    .pipe(tsProject())
    .js.pipe(gulp.dest('./'));
});