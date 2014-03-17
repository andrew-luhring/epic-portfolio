require.config({
	paths: {
			jquery: 'lib/jquery'
		,   jqueryui : 'lib/jquery-ui'
		,   migrate: 'lib/jquery-migrate'
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
		,   _portfolio: 'tests/_portfolio'
	},
	shim : {
	   jqueryui : ['jquery']
	,	shadowbox : ['jquery', 'jqueryui']
	,   shadow: ['shadowbox']
	,   portfolio : ['jquery', 'jqueryui', 'animateShadow']
	,   initial : ['jquery', 'jqueryui', 'animateShadow']
	,   animateShadow: ['jquery', 'jqueryui']
	,   dynamictxt : ['jquery', 'jqueryui']

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