/*jshint expr: true*/

define([
		'jquery'
	,	'utility'
	,   'chai'
	,   'chai_jq'
	], function(jquery, utility, chai, chaijq){
	"use strict";

	var xBrowser = utility.crossBrowserCssValue
		,   Pallete = utility.Pallete
		,   keysVals = utility.keysVals
		,   log = utility.log
		,   assert = chai.assert
		,   expect = chai.expect
		,   should = chai.should
		,   silent = true;


	describe("utility has a", function(){
		var $ = jquery
			,   div = document.createElement('div').id= 'test';

		/**
		 *
		 * @param id - expects a string selector NOT a jQuery selector, just the id. don't include the #.
		 * @param str - string to log.
		 * @returns {{sel: (*|string), string: (*|string)}}
		 */
		function testObj(id, str){
					return {
						sel : id || "test"
					,   string : str || "a string"
					};
				}
		var obj = testObj();
		it("method log which will log to a dom element if true", function(done){
			var logToDom = testObj("logToDom", "logging to dom");
			var loggedToDom = log(logToDom.string, logToDom.sel, true);
			expect(loggedToDom).to.be.true;
			done();
		});
		it("method log which will log to the console if false", function(){
			var logToConsole = testObj("logToConsole", "log to console.");
			var logged = log(logToConsole.string, false, true);
			expect(logged).to.be.false;
		});
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