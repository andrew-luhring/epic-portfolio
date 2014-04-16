/*jshint expr: true*/

//  todo test this file later with protractor.
define([
	'angular'
	, 'jquery'
	, 'button_populate'
	, 'utility'
	, 'chai'
	, 'chai_jq'
	] , function(angular, jquery, button_populate, utility, chai ){
	"use strict";
		var assert = chai.assert;
		var expect = chai.expect;
		var should = chai.should;

		var keysVals = utility.keysVals;

	button_populate;
	//describe("angular Buttons", function(){
	//	it("has a controller Buttons", function(done){
			//keysVals(obj, false );
		//	console.log(vals);
			//console.log(obj.controller('Buttons'));
			//expect(obj.controller('Buttons')).to.be.ok;
			//done();
	//	});
	//	it("exists", function(done){
			//expect(obj).to.exist;
			//done();
	//	});
	//});


/*	describe("Dependencies:", function() {
			var obj = button_populate;
			var   testApp = 'portfolio'
			,   hasModule ;
			hasModule = function(m) {
			var deps = module.value(testApp).requires;
			return deps.indexOf(m) >= 0;
		};

		it("should be registered", function() {
			expect(obj).to.be.ok;
		});
		//you can also test the module's dependencies
		it.skip("should have "+  testApp + ".Controllers as a dependency", function() {
			expect(module.controllers).to.equal(true);
		});
		it.skip("should have "+  testApp + ".Directives as a dependency", function() {
			expect(hasModule('portfolio.Directives')).to.equal(true);
		});
		it.skip("should have "+  testApp + ".Filters as a dependency", function() {
			expect(hasModule('portfolio.Filters')).to.equal(true);
		});
		it.skip("should have "+  testApp + ".Routes as a dependency", function() {
			expect(hasModule('portfolio.Routes')).to.equal(true);
		});
		it.skip("should have "+  testApp + ".Services as a dependency", function() {
			expect(hasModule('portfolio.Services')).to.equal(true);
		});
	});*/



});

