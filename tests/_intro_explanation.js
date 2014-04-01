/*jshint expr: true*/
define ([
	'require'
	, 'utility'
	, 'intro_explanation'
	, 'chai'
	, 'jquery'
	, 'jqueryui'
	, 'chaijq'], function (require, utility, intro_explanation, chai, jquery) {

	"use strict";
	var assert = chai.assert
		, expect = chai.expect
		, should = chai.should
		, Explanation = intro_explanation
		, helper = utility
		, logs = false;
	function fakeDiv(id){
		var div = document.createElement('div');
		div.id = id;
		document.body.insertAdjacentHTML('beforeEnd', div);
		return div;
	}





	describe("explanation.insertText", function(){
		var test = fakeDiv('test')
			,   $test = jquery("#test")
			,   str = "a string of text";
		var explain = new Explanation($test);
		it("will insert text into an object", function(done){
			var returnTxt = explain.insertText(str, true);
			expect(returnTxt).to.equal(str);
			done();
		});
		it("exists", function(){
			expect(explain).to.respondTo('insertText');
		});
	});
	describe("explanation", function(){
		var expl = fakeDiv("expl")
			,  $expl = jquery("#expl");
		var explain = new Explanation($expl);

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
