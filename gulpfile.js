var gulp = require('gulp');
var karma = require('karma').server;

gulp.task('default', ['test']);
gulp.task('test', ['karma']);

gulp.task('karma', function(done) {
    karma.start({configFile : __dirname +'/test/karma.conf.js', singleRun: true});
});

gulp.task('karma-watch', function() {
    karma.start({configFile :  __dirname +'/test/karma.conf.js', singleRun: false});
});