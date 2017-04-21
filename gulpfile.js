var gulp = require('gulp');
var Server = require('karma').Server

var configFile = __dirname + '/test/karma.conf.js';

gulp.task('default', ['test']);
gulp.task('test', ['karma']);

gulp.task('karma', function (done) {
    var server;
    server = new Server({configFile: configFile, singleRun: true});
    server.start();
});

gulp.task('karma-watch', function () {
    var server;
    server = new Server({configFile: configFile, singleRun: false});
    server.start();
});