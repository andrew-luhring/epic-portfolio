"use strict";

require.config({
	paths: {
		//  lib
		    'jquery': 'lib/jquery'
		,   'jqueryui' : 'lib/jqueryui'
		,   'migrate': 'lib/jquery-migrate'
		,   'angular' : 'lib/angular'
		,   'angular-touch': 'lib/angular-touch'
		,   'angular-animate': 'lib/angular-animate'
		,   'animate-shadow': 'lib/angular-shadow'
		,   'mocha': 'lib/mocha'
		,   'chai': 'lib/chai'
		,   'chai_jq' : 'lib/chai-jq'
		,   'attrchange': 'lib/attrchange'
		,   'js_utility': 'lib/js_utility'
		,   'create': 'lib/create'
		,   'three' : 'lib/three'
		,   'mixitup': 'lib/mixitup'
		//  js
		// common
		,  'browserMocha' : 'js/common/_browserMocha'
		,  'dynamictxt': 'js/common/dynamictxt'
		,  'image_resize' : 'js/common/image_resize'
		,  'imagebox' : 'js/common/imagebox'
		,  'shift_color' : 'js/common/shift_color'
		,  'utility': 'js/common/utility'
		,  'viewport_actions': 'js/common/viewport_actions'

		// experiments app
		,  'experiments': 'js/exp-app/experiments'
	},

	shim : {
	    jqueryui : ['jquery']
	,   angular : {'exports' : 'angular'}
	,   ang : {deps: ['jquery', 'angular']}
	,   animateShadow: ['jquery', 'jqueryui']
	,   dynamictxt : ['jquery', 'jqueryui']
	}
});

require([
		'dynamictxt'
	,   'image_resize'
	,   'experiments'

		], function(init){
    });
