"use strict";

require.config({
	paths: {
			jquery: 'lib/jquery'
		,   jqueryui : 'lib/jquery-ui'
		,   migrate: 'lib/jquery-migrate'
		,   angular : 'lib/angular'
		,   ang : 'js/ang'
		,   animateShadow : 'lib/animate-shadow'
		,   utility : 'lib/utility'
		,   shadowbox : 'lib/shadowbox/shadowbox'
		,   shadow : 'lib/shadow'
		,   dynamictxt : 'js/dynamictxt'
		,   attrchange : 'lib/attrchange'
		,   resizeImg : 'js/resize_image'
		,   portfolio: 'js/portfolio'
		,   temp: 'js/temp'
		,   initial : 'js/initial'
		,   portfolioTest: 'tests/_portfolio'
	},
	shim : {
		jqueryui : ['jquery']
	,	angular : {'exports' : 'angular'}
	,   ang : {deps: ['jquery', 'angular']}
	,	shadowbox : ['jquery', 'jqueryui']
	,   shadow: ['shadowbox']
	,   portfolio : ['jquery', 'jqueryui', 'animateShadow']
	,   initial : ['jquery', 'jqueryui', 'animateShadow']
	,   animateShadow: ['jquery', 'jqueryui']
	,   dynamictxt : ['jquery', 'jqueryui']
	,   Portfolio : ['jquery', 'jqueryui', 'shadow', 'portfolio']
	}
});

require([
	  'jquery'
	, 'portfolio'
	, 'shadow'
	, 'initial'
	], function(jquery, portfolio, shadow){
				portfolio;
				shadow;
		}
);

require([
	'jquery'
,   'ang'], function(ang){
	ang;
});