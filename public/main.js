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
	},
	shim : {
		jqueryui : ['jquery']
	,	angular : {'exports' : 'angular'}
	,   ang : {deps: ['jquery', 'angular']}
	,	shadowbox : ['jquery', 'jqueryui']
	,   shadow: ['shadowbox', 'jquery', 'jqueryui']
	,   portfolio : ['jquery', 'jqueryui', 'animateShadow']
	,   resizeImg : ['jquery']
	,   initial : ['jquery', 'jqueryui', 'animateShadow', 'resizeImg']
	,   animateShadow: ['jquery', 'jqueryui']
	,   dynamictxt : ['jquery', 'jqueryui']
	,   Portfolio : ['jquery', 'jqueryui', 'shadow', 'portfolio']
	}
});

require([
	  'initial'
	, 'portfolio'
	, 'shadow'
	], function(initial, portfolio, shadow){
				initial;
				portfolio;
				shadow;
		}
);
require([
	'jquery'
,   'ang'], function(ang){
	ang;
});
