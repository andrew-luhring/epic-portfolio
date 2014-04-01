//describe("worktypes")




/*
function ajaxWebsites(done){
	var obj = {};
	$.getJSON("http://localhost:5000/models/websites.json", function(){
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
*/


	