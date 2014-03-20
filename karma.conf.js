// Karma configuration
// Generated on Sun Mar 16 2014 19:29:48 GMT-0500 (CDT)

module.exports = function(config) {
config.set({
	basePath: './',
	frameworks: ['mocha', 'requirejs'],
	files: [
			'tests/expect.js',
		{pattern: 'public/lib/*.js', included: false},
		{pattern: 'public/tests/*.js', included: false},
		{pattern: 'public/js/*.js', included: false},
		'public/main.js',
		'tests/main-test.js',
		'!node_modules/*',
		'!*ignore*'
		],
	exclude: [
		'*node_modules/*',
		'*ignore*'
	],
	reporters: ['progress', 'growl'],
	port: 9876,
	colors: true,
	logLevel: config.LOB_INFO,
	autoWatch: true,
	browsers: [],
	captureTimeout: 60000,
	singleRun: false,
	plugins: [
		'karma-requirejs',
		'karma-mocha',
		'karma-chrome-launcher',
		'karma-growl-reporter',
		'karma-phantomjs-launcher',
		'karma-unicorn-reporter',
		'expect.js'
	]

});
};
