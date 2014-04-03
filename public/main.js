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
		//  js
		,  'browserMocha' : 'js/_browserMocha'
		,  'ang': 'js/ang'
		,  'button_init': 'js/button_init'
		,  'button_methods': 'js/button_methods'
		,  'category_actions': 'js/category_actions'
		,  'dynamictxt': 'js/dynamictxt'
		,  'gallery_init': 'js/gallery_init'
		,  'gallery_methods': 'js/gallery_methods'
		,  'image_resize' : 'js/image_resize'
		,  'intro_animation' : 'js/intro_animation'
		,  'intro_explanation': 'js/intro_explanation'
		,  'portfolio' : 'js/portfolio'
		,  'utility': 'js/utility'
		,  'viewport_actions': 'js/viewport_actions'
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


/*

require([
	  'jquery'
	, 'portfolio'
	, 'shadow'
	], function(jquery, ang, shadow, portfolio){
//	ang;
			shadow;
			portfolio;

	}
);
//
require([
	'jquery'
,   'ang'], function(ang){
	ang;
});*/
