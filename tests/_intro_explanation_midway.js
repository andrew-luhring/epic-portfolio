/* jshint expr: true, undef: true */
/* global before:true, after:true, beforeEach:true, afterEach:true */

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
			document.body.insertAdjacentHTML('beforeEnd', '<div id=\''+ id + '\'></div>  ' );
			var sel = "#" + id;
			return jQuery(sel);
		}


	describe("explanation.insertText", function(){
		var explain, test, $test, str;
		before(function(){
			$test = fakeDiv('test');
			str = "a string of text";
			explain = new Explanation($test);
			explain.str = str;
		});
		it("will iterate over the hints array, inserting the index into its' element", function(){

		});

	});

});
