/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, it: true, shadow: true*/

"use strict";


(function(){
	//describe("worktypes")
	describe("websites.json", function(){
		var obj = {};
		$.getJSON("websites.json", function(data){
			obj.resp = data;
			obj.work = obj.resp.work;
		});
		$.ajax({
			url : 'websites.json'
		}).done(function(data){
			obj.data = data;
			return obj;
		});
		it("can be parsed as valid json ", function(done){
			expect(obj.work).to.be.an('array');
			console.log(obj.work);
			done();
		});
		it("will have an object with a property of work", function(done){
			expect(obj.data).to.have.property('work');
			console.log(obj.data);
			done();
		});
		it("will return an object", function(){
			expect(obj).to.be.an('object');
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