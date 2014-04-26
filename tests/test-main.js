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
		'window' : '../js/common/mocha_window',
		'shadow': 'shadow',
		'js_utility': 'js_utility',
		'shadowbox': 'shadowbox',

		//scripts

		// experiments app
		'experiments': '../js/exp-app/experiments',

		// common
		'ang': '../js/ang',
		'image_resize' : '../js/common/image_resize',
		'imagebox': '../js/common/imagebox',
		'utility': '../js/common/utility',
		'viewport_actions': '../js/common/viewport_actions',
		'dynamictxt': '../js/common/dynamictxt',
		'resize': '../js/common/resize_image',

		// portfolio-app
		'button_populate': '../js/port-app/button_populate',
		'button_init': '../js/port-app/button_init',
		'button_methods': '../js/port-app/button_methods',
		'category_actions': '../js/port-app/category_actions',
		'gallery_init': '../js/port-app/gallery_init',
		'gallery_methods': '../js/port-app/gallery_methods',
		'intro_animation' : '../js/port-app/intro_animation',
		'intro_explanation': '../js/port-app/intro_explanation',
		'initial': '../js/port-app/initial',
		'portfolio': '../js/port-app/portfolio',
		'temp': '../js/common/temp'

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


