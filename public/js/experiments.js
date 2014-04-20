/*jshint expr: true, undef: true, forin: false, smarttabs:true */
/*global THREE: true, requestAnimationFrame : true */



define (['create', 'angular', 'jquery', 'three'], function (create, angular, jquery) {
	"use strict";
	var logToDom = false;
	var $= jquery;
	var api ;
	/**
	 * Checks for the existence of configuration object, if there is, executes function call with the configuration. else execute function normally.
	 * @param obj   -   the object
	 * @param func  -   function to call
	 * @param config  - config data to send if it exists.
	 * @returns {*} -   returns whatever the result would be if you had called the function normally.
	 */
	function configurate(obj, func, config){
		var thing;
		var tempObject;
		var theFunction = func;
		[obj][0][theFunction] = func;
		if(config){
			thing = new [obj][0][theFunction](config);
		} else {
			thing = new [obj][0][theFunction]();
		}

		/*
			Not sure if theFunction is doing what i want it to. maybe it should be
			var thing;
			obj[0][func] = func;
			if(config){
				thing = new obj[0].func(config);
			} else {
				thing = new obj[0].func();
			}
		 */
		return thing;
	}
	/**
	 *  monkeypatch of THREE.js.
	 * @obj {THREE|*}
	 */
	function WEE(extend){
		for(var i in extend){
			THREE[i] = extend[i];
		}
		return THREE;
	}
	/**
	 *  A private? factory?. the only thing you can pass in is an extend object
	 * @param extend
	 * @returns {obj with properties: width, height, aspectRatio and all of the methods/properties of WEE / THREE}
	 * @constructor
	 */
	function FactorWee(extend){

		var obj;
		if (extend ){
			obj = WEE(extend);
		}   else    {
			obj = WEE();
		}
		obj.width = window.innerWidth;
		obj.height = window.innerHeight;
		obj.aspectRatio = window.innerWidth / window.innerHeight;
		return obj;
	}
	var wee = new FactorWee();
	/**
	 * Instantiates a new scene.
	 * @param config
	 * @returns {*}
	 */
	wee.scene = function(config){
		var scene = wee.Scene;
		return configurate(THREE, wee.Scene, config);
	};
	/**
	 * instantiates a new WebGLRenderer with an optional config
	 * @param config
	 * @returns {*}
	 */
	wee.renderer = function(config){
		var glr = wee.WebGLRenderer;
		console.log ("\nglr");
		console.log(glr);

		var olr = new wee.WebGLRenderer();

		console.log('\nolr');
		console.log(olr);

		var tlr = wee.WebGLRenderer();
		console.log('\ntlr');
		console.log(tlr);
		var oolr = new wee.WebGLRenderer;

		console.log('\noolr');
		console.log(oolr);


		//return configurate (THREE, glr, config);
	};
	//console.log(wee.renderer());
	/**
	 *  Instantiates a new Perspective Camera
	 * @param fieldOfView   -
	 * @param aspectRatio   -   almost always the width / height.
	 * @param near  -   point at which the object is so close that it won't be rendered
	 * @param far   -   vanishing point aka point at which the object is so far away that it wont be rendered
	 * @returns {THREE.PerspectiveCamera}
	 */
	wee.camera = function(fieldOfView, aspectRatio, near, far){
		var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
		return camera;
	};
	/**
	 *  a factory that returns an instance of a functional Three.js environment -- as constructed by wee.
	 * @factory
	 */
	function Environment(obj){
		var temp = {
		   scene : new obj.scene()
		,  renderer : new obj.WebGLRenderer ()
		,  camera : obj.camera(75, obj.aspectRatio, 0.1, 1000)
		};
		return temp;
	}
	/**
	 * returns object with
	 * @factory
	 */
	function Transformation(){
		var animation = {
			rotation: function(x, y, z, config){
				var rotation =  {
					x : x
					,   y : y
					,   z : z
				};
				rotation.config = (function(conf, rotation){

					if(conf){
						return conf(rotation);
					} else {
						return false;
					}
				})(config, rotation);
				return rotation;
			}
		,   position:   function (x, y, z, config){
				var position = {
					x : x
					,   y : y
					,   z : z
				};
				position.config = (function(conf, position){
					if(conf){
						return conf(position);
					}
				})(config, position);
				return position;
			}
		};
		animation.animate = function(obj){
		//	ob.rotation =
				obj.position.z -= 0.1;
				obj.position.y += 0.05;
				obj.position.x += 0.08;
				if(obj.position.z < -50){
					obj.position.z = 0;
				}
				if(obj.position.y > 50){
					obj.position.y = -50;
				}


				$('#overlay')
						.css({"font-size" : "2rem"})
						.text(obj.position.z + "\n" + obj.position.y + "\n" + obj.position.x);

		};

		return animation;
	}
	/**
	 * inserts stylesheet, #overlay and #playground to dom, then adds the environment object to dom.
	 * @param env
	 *
	 */
	function initializeBody(env){
		$('head').append("<link rel='stylesheet' type='text/css' href='/base/public/css/style.css' />");
		if($("#playground").length < 1){
			$('body').addClass('experiments').append("<div id='overlay'>this is an overlay</div>").append("<figure id='playground'></figure>");
		}
		$("#playground").append(env.renderer.domElement);
	}
	function Cube(){
		var geo = new wee.CubeGeometry(1,1,1)
			, mesh = new wee.MeshBasicMaterial({color: 0xaaffaa});
		return new wee.Mesh(geo, mesh);
	}
	(function () {
	var env = new Environment(wee)
		, cube = new Cube()
		, transform = new Transformation();

		env.scene.add(cube);
		env.camera.position.z =5;
		env.renderer.setSize(wee.width, wee.height);
		initializeBody(env);


		function render() {
			requestAnimationFrame(render);
			transform.animate(cube);


			env.renderer.render(env.scene, env.camera);
		}
		render();


		api = {
			env : env
		,   wee : wee
		};
		return api;
	}) ();
	return api;
});
