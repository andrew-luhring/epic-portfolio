/* jshint expr: true, undef: true */
/* global before:true, after:true, beforeEach:true, afterEach:true */
//protip-- if you're going to insert something into the dom to test something--
// TEST THE FUNCTION TO MAKE SURE IT ACTUALLY INSERTS SOMETHING INTO THE DOM
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
	describe("explain.explainHints", function(){
		var explain, test, $test, str;
		before(function(){
			$test = fakeDiv('explainHints');
			explain = new Explanation($test);
			str = explain.hints;
			explain.str = str;
		});
		it('exists and ', function(){
			expect(explain).to.exist;
		});
		it("and has a function explainHints", function(){
			expect(explain).to.respondTo('explainHints');
		});
	});
	describe("explanation.insertText", function(){
		var explain, test, $test, str;
		before(function(){
				$test = fakeDiv('insertText');
				str = "a string of text";
				explain = new Explanation($test);
				explain.str = str;
		});
		it("explanation exists and ", function(){
			expect(explain).to.exist;
		});
		it("has a function insertText", function(){
			expect(explain).to.respondTo('insertText');
		});
		it("which inserts the string passed to it into its' element", function(){
			var returnTxt = explain.insertText(str, true);
			expect(returnTxt).to.equal(str);
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
