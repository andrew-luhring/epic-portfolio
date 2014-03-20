/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, it: true*/
"use strict";
var expect = require("expect.js");
var $ = require('../lib/jquery');
var jsdom = require("jsdom").jsdom;
var doc = jsdom('');



//require([
//	'require'
	//,   'shadowbox'
	//,   'jquery'
	//,   'jqueryui'
//], function(){

	//port = root.port || {};

describe("thing", function(){
	it("is a passing test", function(){
		expect("this is").to.be.an("object");
	});

});

//(function(root){


//
// 	root.port = root.port || {};e


//})(this);
//});