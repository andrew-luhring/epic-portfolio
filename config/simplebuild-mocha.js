var mocha = require("./mocha.conf.js");
var glob = require("glob");
var simplebuild = require('../extensions/simplebuild.js');

exports.runTests = function(options, success, failure) {
	simplebuild.deglobSync(options.files).forEach(function(file) {
		mocha.addFile(file);
	});

	var failures = false;
	mocha.run().on("fail", function() {
		failures = true;
	}).on("end", function() {
			if (failures) failure("Tests failed");
			success();
		});
};

exports.runTests.title = "Mocha";
exports.runTests.description = "Run Mocha tests.";