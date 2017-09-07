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
            'app/lib/angular/angular.js',
            'app/lib/angular-route/angular-route.js',
            'app/lib/angular-animate/angular-animate.js',
            'app/lib/angular-aria/angular-aria.js',
            'app/lib/angular-material/angular-material.js',
            'app/lib/angular-mocks/angular-mocks.js',
            'app/lib/moment/moment.js',
            'app/lib/utf8/utf8.js',
            'app/lib/jasmine-promise-matchers/dist/jasmine-promise-matchers.js',
            'app/lib/vis/dist/vis.js',
            'app/lib/smdatetimerangepicker/src/picker.js',
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
