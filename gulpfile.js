/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var merge = require('merge2');

gulp.task('build-ts', function () {
    var tsResult = gulp.src([
        './public/js/**/*.ts',
        './typings/**/*.d.ts',
        './*.ts'
        ],
        {base: "."})
    .pipe(ts({
         typescript: require('typescript'),
         declarationFiles: false,
         noExternalResolve: true,
         target: "es5",
         module: "amd",
         emitDecoratorMetadata: true,
				 experimentalDecorators: true,
         sourceMap: true
    }));

    return merge([
        tsResult.dts.pipe(gulp.dest('.')),
        tsResult.js.pipe(gulp.dest('.'))
    ]);
});

var path = {
  sourceTS: "public/js/**/*.ts",
  sourceJS: "public/js/**/*.js",
  html: "public/**/*.html",
  style: "public/stylesheets/**/*.css"
};

gulp.task('serve', function(done) {
  browserSync({
    open: false,
    port: 4000,
    server: {
      baseDir: ['./public'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

function reportChange(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
  gulp.watch(path.sourceTS, [browserSync.reload]).on('change', reportChange);
  gulp.watch(path.html, [browserSync.reload]).on('change', reportChange);
  gulp.watch(path.style, [browserSync.reload]).on('change', reportChange);
});
