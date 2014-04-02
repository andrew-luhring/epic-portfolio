/* jshint expr: true, undef: true */
/* global before:true, after:true, beforeEach:true, afterEach:true */

define ([
	'require'
	, 'utility'
	, 'intro_explanation'
	, 'chai'
	, 'jquery'
	, 'window'
	, 'jqueryui'
	, 'chaijq'], function (require, utility, intro_explanation, chai, jquery, mochaWindow) {

	"use strict";
	var assert = chai.assert
		, expect = chai.expect
		, should = chai.should
		, Explanation = intro_explanation
		, helper = utility
		, logs = false;

	function fakeDiv(id){
		document.body.insertAdjacentHTML('beforeEnd', '<div id=\''+ id + '\'></div>  ' );
		var sel = "#" + id;
		return jQuery(sel);
	}

//var derp = new Explain($("#content"));
// derp.insertText("a string of text", true);

//protip-- if you're going to insert something into the dom to test something--
// TEST THE FUNCTION TO MAKE SURE IT ACTUALLY INSERTS SOMETHING INTO THE DOM
	describe("explanation.insertText", function(){
		var explain, test, $test, str;
		before(function(){
				$test = fakeDiv('test');
				str = "a string of text";
				explain = new Explanation($test);
				explain.str = str;
		});
		it("will insert the string passed to it into its' element", function(){
			var returnTxt = explain.insertText(str, true);
			expect(returnTxt).to.equal(str);
		});
		it("exists", function(){
			expect(explain).to.respondTo('insertText');
		});
	});
	describe("explanation", function(){
		var expl = fakeDiv("expl");
		var explain = new Explanation(expl);

		it("has an array of hints", function(){
			expect(explain.hints).to.be.an('array');
		});
		it("has a jquery object", function(){
			expect(explain.obj).to.be.an.instanceof(jquery);
		});
	});
	describe('requires', function(){
		var expl = fakeDiv("expl"),  $expl = jquery("#expl");
		var explain = new Explanation($expl);
		it('exist in the way they should', function(){
			helper.keysVals(explain, logs);
			expect(explain).to.be.an('object');
			expect(helper).to.be.an('object');
		});
	});
});
