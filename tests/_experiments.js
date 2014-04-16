//webgl


define (['three', 'chai', 'sinon', 'utility', 'mocha', 'sinon_chai', 'experiments'], function (three, chai, sinon, utility, mocha, sinon_chai, experiments) {
	"use strict";
//log params : thingToLog , logToDom, insertDiv, silent.
	var log = utility.log
		, keysVals = utility.keysVals
		, exp = experiments
		, expect = chai.expect
		, should = chai.should
		, assert = chai.assert
		, silent = true;

	chai.use(sinon_chai);

	describe("experiments", function(){
		it("exists", function(){
			log(experiments, false, silent);
			expect(experiments).to.be.ok;
		});
	});


});
