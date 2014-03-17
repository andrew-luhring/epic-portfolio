var tests = [];


for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/tests\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '../',

	paths: {
		jquery: 'public/lib/jquery'
		, 'jQuery': 'public/lib/jquery'
		,   jqueryui : 'public/lib/jquery-ui'
		,   migrate: 'public/lib/jquery-migrate'
		,   animateShadow : 'public/lib/animate-shadow'
		,   utility : 'public/lib/utility'
		,   shadowbox : 'public/lib/shadowbox/shadowbox'
		,   shadow : 'public/lib/shadow'
		,   dynamictxt : 'public/js/dynamictxt'
		,   attrchange : 'public/lib/attrchange'
		,   resizeImg : 'public/js/resize_image'
		,   portfolio: 'public/js/portfolio'
		,   temp: 'public/js/temp'
		,   initial : 'public/js/initial'
		,   _portfolio: 'public/tests/_portfolio'
	},
	shim : {
		jqueryui : ['jQuery']
		,	shadowbox : ['jQuery', 'jqueryui']
		,   shadow: ['shadowbox']
		,   portfolio : ['jQuery', 'jqueryui', 'animateShadow', 'shadow']
		,   initial : ['jQuery', 'jqueryui', 'animateShadow']
		,   animateShadow: ['jQuery', 'jqueryui']
		,   dynamictxt : ['jQuery', 'jqueryui']
	},
	// ask Require.js to load these files (all our tests)
	deps: tests,

	// start test run, once Require.js is done
	callback: window.__karma__.start
});


define(['jquery'], function($) {

	describe('just checking', function() {

		it('works for app', function() {
			var el = $('<div></div>');

			expect(el).to.be.ok();
		});

	});

});

