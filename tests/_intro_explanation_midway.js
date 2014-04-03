/* jshint expr: true, undef: true */
/* global before:true, after:true, beforeEach:true, afterEach:true */

define ([
	'require'
	, 'utility'
	, 'intro_explanation'
	, 'chai'
	, 'jquery'
	, 'jqueryui'
	, 'sinon-chai'
	, 'chai_jq'
	, 'chai_things'
	, 'chai_as_promised'
	, 'chai_change'
], function (require, utility, intro_explanation, chai, jquery) {
	"use strict";
//TODO: make extension for karma-mocha/mocha/etc that rewords fail to be something more motivational. like: 1 test  isn't quite perfect yet. or 4 tests need your attention-- but 100 tests passed with flying colors! rather than: 1 test failed 12 tests completed.

	var assert = chai.assert
		, expect = chai.expect
		, should = chai.should
		, chai_as_promised = require('chai_as_promised')
		, things = require('chai_things')
		, sinonChai = require("sinon-chai")
		, jq = require('chai_jq')
		, Explanation = intro_explanation
		, helper = utility
		, logs = false;

	chai.use(chai_as_promised)
			.use(sinonChai)
			.use(things)
			.use(jq);
//			.use(change)

	function fakeDiv(id){
			document.body.insertAdjacentHTML('beforeEnd', '<div id=\''+ id + '\'></div>  ' );
			var sel = "#" + id;
			return jQuery(sel);
		}

	describe("explainHints", function(){
		var explain, test, $test, str, returnTxt;

		before(function(done){
			$test = fakeDiv('midway_explainHints');
			explain = new Explanation($test);
			str = explain.hints;
			returnTxt = explain.explainHints(1, true);
			setTimeout(function(){
				done();
			}, 3000);

		});
		it("is the method of explain that iterates over each item in the hints array inserting it into the page", function(){

//			expect(explain.obj.text()).to.contain(str[0]);
			expect(explain.obj.text()).to.contain(str[str.length - 1]);
			//var str = explain.hints;
			//expect(explain.obj.text()).to.contain(str[str.length - 1]);
		});
		it("will iterate over each item every second", function(){
			expect(returnTxt).to.contain(str[7]);

			//returnTxt.should.contain.string(str[0].toString());
			//arr.should.contain.something.to.have.a.string('');

		});

	});
});
