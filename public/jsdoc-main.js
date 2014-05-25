/**
 * @author Andrew Luhring
 */


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

					   // jsdoc app
					   ,	'jsdoc' : 'js/jsdoc-app/jsdoc'
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
					   ,   'mixitup': ['jquery']
				   }
			   });

require([
			'jsdoc'

		], function(init){
});
