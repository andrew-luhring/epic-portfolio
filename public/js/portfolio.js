/* jshint undef: true */
/* global jQuery: true, resizeImg: true, Shadowbox: true, port: true, window: true, define: true*/
"use strict";

define([
	'jquery'
,   'jqueryui'
,   'animateShadow'
,   'shadow'

	],  function($, jqueryui, animateShadow, Shadowbox){

var shadow = {}
	,   selected
	,   contentArray = ['albumArt', 'logoDesign', 'UX', 'other']
	,   content = {}
	,   $selectedArray
	,   i
	,   imgGallery
	,   galleryDivA
	,   timeoutId;
shadow.down = { boxShadow : '2 3 9 -1 #400339' };
shadow.up = { boxShadow : '10 15 30 -5 #400339' };

$(document).ready(function() {


	});
});
/*
	Parts of this file:
	1.  gallery
		*   show / hide gallery.
		*   gallery population
		*
	2.  button movements.

	2.  Content-specific gallery actions.

	3.  Shadowbox setup

	4.  Button actions.


*/

