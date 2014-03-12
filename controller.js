(function(){
//noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
	"use strict";

	//  node requires

	//==============================
	// grunt
	// grunt-browserify
	// express-hbs
	// express
	//
	var express = require('express')
		, portN = 5000
		, hbs = require('express-hbs')
		, app = express()
		, path = require('path')
		, Server = require('./server')

	//  view paths
	//==============================
	//
	//
	//
		, viewsD = __dirname + '/views/'
		, partialsD = viewsD + 'partials/'
		, layoutsD = viewsD + 'layouts/'

	//  view file paths
	//==============================
	//
	//
	//
		, publicD =  path.join(__dirname, 'public')
		, defaultF = layoutsD + 'default.hbs';
	//  Express setup.
	//==============================
	//
	//
	//
	app.use(express.static(publicD))
			.use(express.bodyParser())
			.use(express.logger('dev'))
			.use(express.methodOverride())
			.use(express.static(path.join(__dirname, 'public')))
			.use(express.errorHandler());

	app.set('view engine', 'hbs')
			.set('port', process.env.PORT || portN)
			.set('cache', false)
			.set('views', viewsD);

	app.engine('hbs', hbs.express3({
		partialsDir: partialsD,
		defaultLayout: defaultF,
		layoutsDir: layoutsD
	}));

	var indx = {
	derp : {
		src : '/'
	,   id : 'swag'
	}
};
	app.get( '/' ,function (req, res) {
		res.render(partialsD + 'index.hbs', indx);
	});
	new Server(app);
})();


