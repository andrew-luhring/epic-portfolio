"use strict";

require.config({
	paths: {
			jquery: 'lib/jquery'
		,   jqueryui : 'lib/jqueryui'
		,   migrate: 'lib/jquery-migrate'
		,   angular : 'lib/angular'
		,   ang : 'js/ang'
		,   animateShadow : 'lib/animateShadow'
		,   utility : 'lib/utility'
		,   shadowbox : 'lib/shadowbox'
		,   shadow : 'lib/shadow'
		,   dynamictxt : 'js/dynamictxt'
		,   attrchange : 'lib/attrchange'
		,   resizeImg : 'js/resize_image'
		,   portfolio: 'js/portfolio'
		,   temp: 'js/temp'
		,   initial : 'js/initial'
		,   'mocha': 'lib/mocha'
		,   'chai': 'lib/chai'
		,   'chaijq' : 'lib/chai-jq'
		,   'browserMocha' : 'js/_browserMocha'
	},
	shim : {
		jqueryui : ['jquery']
	,	angular : {'exports' : 'angular'}
	,   ang : {deps: ['jquery', 'angular']}
	,	shadowbox : ['jquery', 'jqueryui']
	,   shadow: ['shadowbox']
	//,   portfolio : ['shadow', 'shadowbox', 'jquery', 'jqueryui', 'animateShadow']
	//,   initial : ['jquery', 'jqueryui','ang', 'animateShadow']
	//,   portfolio : ['jquery', 'jqueryui', 'animateShadow']
	,   initial : ['jquery', 'jqueryui', 'animateShadow']
	,   animateShadow: ['jquery', 'jqueryui']
	,   dynamictxt : ['jquery', 'jqueryui']
	//,   Portfolio : ['jquery', 'jqueryui', 'shadow', 'portfolio']
	,   'chaijq': ['chai']
	}
});

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
});