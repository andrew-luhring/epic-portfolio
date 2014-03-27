/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, it: true, shadow: true*/

require(['jquery', 'portfolio', 'chai',  'chaijq', 'jqueryui'], function($, portfolio, chai){
"use strict";
var expect = chai.expect;

function keysAndValues(object){
	//	var keys = [Object.keys(config)];

	for(var i in object){
		if(object.hasOwnProperty(i)){
		console.log(i + " :  ");
			for(var j in object[ i ]){
				if(object.hasOwnProperty(i)){
					console.log("      "+ j + " : " + object[ i ][ j ]);
				}
			}
			console.log("");
		}
	}
}

(function(){
	//describe("worktypes")
	function ajaxWebsites(done){
		var obj = {};
		$.getJSON("websites.json", function(){
			}).done(function(data){
					obj.resp = data;
					obj.work = obj.resp.work;
			}).always(function(){
				obj.done = done();
			});
		return obj;
	}
	describe("populateFunction", function(){
		var obj = {};
		beforeEach(function(done){
			obj = ajaxWebsites(done);
		});

		it("will populate content with its id attribute", function(done){
			var content = {};
			for ( var i = 0; i < obj.work.length; i++) {
				var className = obj.work[i].id;
				content[className] = $('.' + className);
				console.log(content[className]);
			}
			expect(content).to.be.ok();
			done();
		});
	});
	describe("obj.work", function(){
		var obj = {};
		beforeEach(function(done){
			obj = ajaxWebsites(done);
		});
		it("'s first item will have a property ref with at least 1 item", function(done){
			expect(obj.work[0].ref.length).to.be.greaterThan(1);
			done();
		});
		it("'s first item will have an id", function(done){
			expect(obj.work[0].id).to.be.ok();
			done();
		});
	});
	describe("websites.json", function(){
		var obj = {};
		beforeEach(function(done){
			obj = ajaxWebsites(done);
		});
		it("can be parsed as valid json ", function(done){
			expect(obj.work).to.be.an('array');
			expect(obj.work.length).to.equal(4);
			done();
		});
		it("will return an object", function(){
			expect(obj.resp).to.be.an('object');
		});
	});
	describe("portfolio", function(){
		it('is an iframe', function(){
			var port = $("#portfolio")
					, iframe = document.querySelectorAll('iframe');
			expect(iframe.length).to.be(1);
		});
	});
	describe("shadow", function(){
		it("has a property down", function(){
			expect(shadow).to.have.property('down');
		});
	});
	describe("expect", function(){
		it('uses jquery', function(){
			expect($).to.be.ok();
		});
		it("exists", function(){
			expect("a").to.be.ok();
		});
	});
})();


});