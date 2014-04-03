module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['mocha', 'requirejs', 'chai'],
    files: [
	    {pattern: 'public/lib/*.js', included: false},
	    {pattern: 'public/js/*.js', included: false},
	    {pattern: 'tests/_*.js', included: false},
	    'config/mocha.window.js',
	    'tests/test-main.js'
    ],
    exclude: [
	    '**/*min*',
	    'public/main.js'
    ],
	  htmlReporter: {
		  outputDir: 'tests/karma',
	  },

    preprocessors: {
    },
    reporters: ['growl', 'mocha', 'html'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
	captureTimeout: 60000,
    singleRun: false
  });
};
