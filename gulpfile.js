/**
 * Created by MR_CH on 2017/4/18.
 */
var gulp =  require('gulp');
var rev = require('gulp-rev');//生成版本号
var revReplace = require('gulp-rev-replace');//修改文件  在文件后加上版本号
var filter = require('gulp-filter');//过滤器，选择指定的文件
var csso = require('gulp-csso');//css文件压缩器
var uglify = require('gulp-uglify');//js文件压缩器
var useref = require('gulp-useref');//将特定注释中的文件合并成一个文件

gulp.task('default',function () {
    var jsFilter = filter('**/*.js',{restore:true});//选择.js文件
    var cssFilter = filter('**/*.css',{restore:true});//选择.css文件
    var indexHtmlFilter = filter(['**/*','!**/index.html'],{restore:true});//选择除index.html外的所有文件
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});