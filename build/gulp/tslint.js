const gulp = require('gulp');
const tslint = require('gulp-tslint');

gulp.task('tslint', ()=>{
    return gulp.src(['**/*.ts', '!node_modules/**'])
    .pipe(tslint())
    .pipe(tslint.report());
})