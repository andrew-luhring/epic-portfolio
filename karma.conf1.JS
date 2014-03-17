// Karma configuration
// Generated on Sun Mar 16 2014 17:34:37 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['mocha', 'commonjs'],


    // list of files / patterns to load in the browser
    files: [
	  'public/lib/jquery.js',
      'public/js/*.js',
      'public/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
      'node_modules/*'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
	  reporters: ['unicorn', 'growl'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: [],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

	  plugins: [
		  'karma-mocha',
		  'karma-chrome-launcher',
		  'karma-growl-reporter',
		  'karma-phantomjs-launcher',
		  'karma-commonjs',
		  'karma-unicorn-reporter'
	  ]
  });
};
