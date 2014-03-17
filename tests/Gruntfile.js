module.exports = function(grunt) {
	"use strict";

	var config = 	{
		jshint:  {
			files :[
				"tests/_portfolio.js"
			,   "tests/_tests.js"
			]

			,	options: lintOptions()
		}
		,   watch:{
			test: {
				files: [
					"tests/_portfolio.js"
					,"tests/_tests.js"
				]
			,	tasks: ["jshint"]
			}
		,	livereload: {
				files : [
					"tests/_portfolio.js"
					,"tests/_tests.js"
				]
				,	options: {
						livereload: true
				}
			}
		,
		}
	};
	grunt.initConfig( config );
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask("default", 'That income tax swag', ['jshint']);
};
function lintOptions() {
	"use strict";
	return {
		bitwise: true,
		curly: true,
		eqeqeq: true,
		forin: true,
		latedef: true,
		newcap: true,
		noarg: true,
		nonew: false,
		undef: true,
		unused: false,
		trailing: false,
		node: true,
		laxcomma: true,
		smarttabs: true,
		debug: true,
		sub: true,
		supernew: true,
		browser: true,
		devel: true,
		strict: true,
		globals : {
			jquery : true
			,   jQuery : true
			,   $ : true
			,   expect : true
			,   mocha : true
			,   describe : true
			,   it : true
			,   beforeEach: true
			,   afterEach : true
		}
	};
}