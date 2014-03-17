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


//(function(root){


//
// 	root.port = root.port || {};


describe("expect", function(){
	it("exists", function(){
		expect("a").to.be.ok();
	});
	it('uses jquery', function(){

		expect($).to.be.ok();
	});

});


//})(this);
//});