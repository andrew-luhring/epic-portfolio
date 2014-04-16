module.exports = function (config) {
	config.set ({
		basePath      : '../',
		frameworks    : ['mocha', 'requirejs', 'chai'],
		files         : [
			{pattern: 'public/lib/*.js', included: false},
			{pattern: 'public/js/*.js', included: false},
			{pattern: 'tests/_*.js', included: false},
			'config/mocha.window.js',
			'tests/test-main.js'
		],
		exclude       : [
			'**/*min*',
			'public/main.js'
		],
		client: {
			mocha: {
					ui: 'bdd'
				,   reporter : 'nyan'
				,   growl : true
			}
		},
		htmlReporter: {
			outputFile: 'tests/units.html'
		},
		reporters     : [ 'growl', 'mocha', 'html'],
		port          : 9876,
		colors        : true,
//		logLevel      : config.LOG_DEBUG,
		logLevel      : config.LOG_INFO,
		autoWatch     : true,
		browsers      : ['Chrome'],
		plugins       : [
			'karma-requirejs',
			'karma-mocha',
			'karma-chai',
			'karma-chai-plugins',
			'karma-chrome-launcher',
			'karma-mocha-reporter',
//			'karma-htmlfile-reporter',
			/*//'karma-html-reporter',*/
			'karma-growl'
		],
		captureTimeout: 60000,
		singleRun     : false
	});
};
/*		htmlReporter: {
			outputDir: 'karma_html',
			templatePath: __dirname+'/jasmine_template.html'
		},*/