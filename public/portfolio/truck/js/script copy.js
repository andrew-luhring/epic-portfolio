/*
//forms
(function(){
	"use strict";
		var test = false;
	jQuery(document).ready(function($){
		$('#d7v1 .subsec:nth-child(odd)').addClass("left");
		$('#d7v1 .subsec:nth-child(even)').addClass("right");
		$("[name='btn_align']").on("click", function(){
			$('.subsec_btn').removeClass('left center right');
			$(".subsec_btn").addClass($(this).attr('data-send'));
		});
	
		if(!test){
			$(".test").removeClass("test");
		}
	});
	
	
	function Btn_Align($scope) {
		//$scope.align = 'left';
		//$scope.modify= 'false';
	}
})();


//safari zoom bug fix.
(function(doc) {
 "use strict";
	var addEvent = 'addEventListener',
	    type = 'gesturestart',
	    qsa = 'querySelectorAll',
	    scales = [1, 1],
	    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
 
	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}
 
	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [0.25, 1.6];
		doc[addEvent](type, fix, true);
	}
 
}(document));
function webStorm(run){
	"use strict";
		var ws;
		function socket() {
		  ws = new WebSocket("ws://127.0.0.1:8080");
		  ws.onmessage = function ( e ) {
		    var data = JSON.parse(e.data);
		    if ( data.r ) {
		      location.reload();
		    }
		  };
		}
	
	if(run === true){
		setInterval(function () {
		  if ( ws ) {
		    if ( ws.readyState !== 1 ) {
		      socket();
		    }
		  } else {
		    socket();
		  }
		}, 1000);
	}
}
function angularOn(run){
"use strict";
	*/
/*angular.module('dft', []).config(function($interpolateProvider){
                $interpolateProvider.startSymbol('[[').endSymbol(']]');
            }
    );*//*

}

//truck

	var app = angular.module('truck', []).config(function($interpolateProvider){
		"use strict";
		$interpolateProvider.startSymbol('[[').endSymbol(']]');
	});
	app.factory('Rotation', function(){
		"use strict";
		return {
			x : '1',
			y : '1',
			z : '1'
		};
	});
	
	function TruckCtl($scope, Rotation){
		"use strict";
		$scope.x = Rotation.x;
		$scope.x = Rotation.y;
		$scope.x = Rotation.z;
	}
	function Truck($scope, Rotation){
		"use strict";
		$scope.x = Rotation.x;
		$scope.x = Rotation.y;
		$scope.x = Rotation.z;
	}

	function Btn_Align($scope) {
		$scope.align = 'left';
	}

//
*/
