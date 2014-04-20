module.exports = function (config) {
	config.set ({
		basePath: '../',
		frameworks: ['mocha', 'requirejs', 'chai'],
		files: [
			'public/css/style.css',
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
			outputDir: 'tests/karma'
		},
		reporters: ['growl', 'mocha', 'html'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		captureTimeout: 60000,
		singleRun: false
	});
};
