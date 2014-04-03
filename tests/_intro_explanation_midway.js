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
	, 'chaijq'
], function (require, utility, intro_explanation, chai, jquery) {
	"use strict";



	var assert = chai.assert
		, expect = chai.expect
		, should = chai.sho
		, sinonChai = require("sinon-chai")
		, Explanation = intro_explanation
		, helper = utility
		, logs = false;

	chai.use(sinonChai)


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
			console.log(returnTxt);
			expect(returnTxt).to.contain(str[0]);


		});

	});
});
