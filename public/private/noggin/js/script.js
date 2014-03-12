//i shouldve just used jquery to do this. writing this in javascript was more complicated than it needed to be.
//global variables!!
var request;
var op;
var keyA = "fa96520990157f8a3077251dabf16267";

$(document).ready(function() {
	//function get all the things! it grabs the datas.
	function gatt(place) {
		$.getJSON(place + "?key=" + keyA, function(data) {
			$.each(data, function(key, val) {
				var thisData = this;
				for (var i = 0; i < thisData.length; i++) {
					var thisObject = thisData[i];
					$.post('http://recruiting.nogginlabs.com/web-service/api/set_db_value.php', {
						"key" : keyA,
						"email" : "andrew.luhring@gmail.com",
						"task_id" : thisObject.name,
						"value" : "complete"

					});

					$("#responded h1:nth-of-type(" + (i + 1) + ")").append(thisObject.name);
					for (var thisProperty in thisObject ) {
						var thisValue = thisObject[thisProperty];
						$("#responded p:nth-of-type(" + (i + 1) + ")").append([thisProperty] + "  :  " + thisValue + "<br />");
					}
				}
			});
		}, {
			"email" : "andrew.luhring@gmail.com"
		});
	}


	$("#rainbows").click(function() {
		gatt("http://recruiting.nogginlabs.com/web-service/api/get_task_list.php");
		$("#responded").hide(2);
		$("#responded").show("slow");
	});
});

