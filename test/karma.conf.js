// Karma configuration
// Generated on Fri Oct 23 2015 19:58:04 GMT+0200 (Paris, Madrid (heure d’été))

module.exports = function (config) {

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '..',


        plugins : ['karma-jasmine', 'karma-phantomjs-launcher'],

        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-animate/angular-animate.js',
            'app/bower_components/angular-aria/angular-aria.js',
            'app/bower_components/angular-material/angular-material.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/jasmine-promise-matchers/dist/jasmine-promise-matchers.js',
            'app/bower_components/vis/dist/vis.js',
            'app/bower_components/angular-material-datetimepicker/js/angular-material-datetimepicker.js',
            'app/common/src/**/*.js',
            'app/partial/**/*.js',
            'test/**/*-spec.js'
        ],


        // list of files to exclude
        exclude: [],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
