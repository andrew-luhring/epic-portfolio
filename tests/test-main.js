/*jshint expr: true, undef: true */
var tests = []
	,   regex = /(tests\/)(_.*\.js)/
	,   not = /(.[_])*((^(?:(?!ignore).)*)(js))/;

for (var file in window.__karma__.files) {
	//console.log(file);
	if (regex.test(file)  && not.test(file) ) {
		//console.log("******************************");
		//console.log("testing: " + file);
		//console.log("******************************");
		tests.push(file);
	}
}
requirejs.config({
	baseUrl: '/base/public/lib/',

	paths: {
		//lib
		'jquery': 'jquery',
		'jquery-migrate': 'jquery-migrate.js',
		'angular': 'angular',
		'angular-touch': 'angular-touch',
		'angular-animate': 'angular-animate',
		'animate-shadow': 'angular-shadow',
		'attrchange': 'attrchange',
		'animateShadow': 'animateShadow',
		'chai': 'chai',
		'chai_jq' : 'chai-jq',
		'sinon': 'sinon',
		'create': 'create',
		'three' : 'three',
		'mixitup': 'mixitup',

		//tests
		'chai_things': 'chai-things',
		'chai_change': 'chai-change',
		'chai_as_promised': 'chai-as-promised',
		'sinon_chai': 'sinon-chai',
		'sinon_timers': 'sinon-timers',
		'mocha' : 'mocha',
		'window' : '../js/mocha_window',
		'shadow': 'shadow',
		'js_utility': 'js_utility',
		'shadowbox': 'shadowbox',

		//scripts
		'ang': '../js/ang',
		'button_populate': '../js/button_populate',
		'button_init': '../js/button_init',
		'button_methods': '../js/button_methods',
		'category_actions': '../js/category_actions',
		'experiments': '../js/experiments',
		'gallery_init': '../js/gallery_init',
		'gallery_methods': '../js/gallery_methods',
		'image_resize' : '../js/image_resize',
		'imagebox': '../js/imagebox',
		'intro_animation' : '../js/intro_animation',
		'intro_explanation': '../js/intro_explanation',
		'utility': '../js/utility',
		'viewport_actions': '../js/viewport_actions',
		'dynamictxt': '../js/dynamictxt',
		'initial': '../js/initial',
		'portfolio': '../js/portfolio',
		'resize': '../js/resize_image',
		'temp': '../js/temp'

	},

	shim: {
			jquery : { exports: '$' }
		,   jqueryui : ['jquery']
		,   sinon : {
				exports: 'sinon'
			}

		,   'angular' : {'exports' : 'angular'}
		,   'angularRoute': ['angular']
		,   'chai_things': ['chai']
//		,   'chai_change': ['chai']
		,   'window' : ['mocha']
		,	shadowbox : ['jquery', 'jqueryui']
		,   shadow: ['shadowbox']
		,   animateShadow: ['jquery', 'jqueryui']
		,   dynamictxt : ['jquery', 'jqueryui']
	},
	// ask Require.js to load these files (all our tests)
	deps: tests,
	// start test run, once Require.js is done
	callback: window.__karma__.start
});


