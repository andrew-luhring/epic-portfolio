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
		var obj = button_populate;
		var keysVals = utility.keysVals;


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

	/*	var module
		before(function() {
			module = angular.module("App");
		});
		it("should be registered", function() {
			expect(module).not.to.equal(null);
		});*/
	/*
	describe("Dependencies:", function() {

		var deps;
		var hasModule = function(m) {
			return deps.indexOf(m) >= 0;
		};
		before(function() {
			deps = module.value('appName').requires;
		});

		//you can also test the module's dependencies
		it("should have App.Controllers as a dependency", function() {
			expect(hasModule('App.Controllers')).to.equal(true);
		});

		it("should have App.Directives as a dependency", function() {
			expect(hasModule('App.Directives')).to.equal(true);
		});

		it("should have App.Filters as a dependency", function() {
			expect(hasModule('App.Filters')).to.equal(true);
		});

		it("should have App.Routes as a dependency", function() {
			expect(hasModule('App.Routes')).to.equal(true);
		});
		it("should have App.Services as a dependency", function() {
			expect(hasModule('App.Services')).to.equal(true);
		});
	});*/


});

