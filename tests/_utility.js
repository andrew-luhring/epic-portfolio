/*jshint expr: true*/

define([
		'jquery'
	,	'utility'
	,   'chai'
	,   'chaijq'
	], function(jquery, utility, chai, chaijq){
	"use strict";

	var xBrowser = utility.crossBrowserCssValue
		,   Pallete = utility.Pallete
		,   keysVals = utility.keysVals
		,   assert = chai.assert
		,   expect = chai.expect
		,   should = chai.should;

	describe("utility has a", function(){
		var $ = jquery
			,   div = document.createElement('div').id= 'test'
			,   obj = {
					sel : $('#test')
				,   thing : "a string"
				};

		it("method crossBrowserCssValue which returns a jq object", function(done){
			var jqO = xBrowser(obj.sel, 'transition', 'all 1s ');

			expect(jqO).to.be.an.instanceof($);
			done();
			//todo : make sure this actually adds the property... I'm kind of skeptical.
		});
		it("method pallete", function(){
			obj.pallete = new Pallete(obj.sel, 'all 3s', 60 );

			expect(utility).to.respondTo('Pallete');
			expect(obj.pallete.range).to.equal(60);
		});
		it("method keysVals", function(){
			var vals = keysVals(obj, false);
			expect(vals).to.exist;
			expect(vals).to.be.a('string');
		});
	});
});