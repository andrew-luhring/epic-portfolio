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
		,   'shadowbox' : 'lib/shadowbox'
		,   'shadow' : 'lib/shadow'
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

		// portfolio app
		,  'ang': 'js/port-app/ang'
		,  'button_init': 'js/port-app/button_init'
		,  'button_methods': 'js/port-app/button_methods'
		,  'button_populate': 'js/port-app/button_populate'
		,  'category_actions': 'js/port-app/category_actions'
		,  'gallery_init': 'js/port-app/gallery_init'
		,  'gallery_methods': 'js/port-app/gallery_methods'
		,  'intro_animation' : 'js/port-app/intro_animation'
		,  'intro_explanation': 'js/port-app/intro_explanation'
		,  'portfolio' : 'js/port-app/portfolio'
	},

	shim : {
	    jqueryui : ['jquery']
	,   angular : {'exports' : 'angular'}
	,   ang : {deps: ['jquery', 'angular']}
	,   shadowbox : ['jquery', 'jqueryui']
	,   shadow: ['shadowbox']
	,   initial : ['jquery', 'jqueryui', 'animateShadow']
	,   animateShadow: ['jquery', 'jqueryui']
	,   dynamictxt : ['jquery', 'jqueryui']
	,   'chai_jq': ['chai']
	,   'chaithings': ['chai']
	}
});

require([
		'button_init'
	,   'dynamictxt'
	,   'intro_animation'
	,   'button_methods'
	,   'intro_explanation'
	,   'gallery_init'
	,   'category_actions'
	,   'gallery_methods'
	,   'image_resize'

		], function(init){
    });
