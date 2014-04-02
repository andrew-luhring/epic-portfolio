define ([
	  'jquery'
	, 'button_populate'
	, 'jqueryui'
], function (jquery, buttons) {
	"use strict";
	$ = jquery;

	/*  timings = [
	90
,   10
,   5
,   10
,   10
,   10
,   5
,   5
,   10
,   10
,   10
,   10
];*/
	/**
	 *  @function
	 *  singleton that explains the site.
	 */

	function Explain(objToPrintTo, callback){




		var $obj = $(objToPrintTo);
		var hints = [
					"(if you want to see my work, just click one of these buttons.)"
					,   "i mean...if you don't want to you don't have to- just keep doing what you're doing."
					,   "(which is nothing)."
					,   "...so...how are things?"
					,   "did you really respond to that question in your head?"
					,   "if you did, just a heads up- next time i ask you a question, you don't have to answer it...i'm not real"
					,   "...or am i?"
					,   "uh oh..."
					,   "have you ever been on a website while it's having an existential crisis?"
					,   "just kidding, i'm fine."
					,   "i'm just gonna show stuff, now if that's ok..."
					,   ''
				];


		function insertText(str, testapi){
			$($obj).text(str);
			if(testapi === true){
				//console.log("true");
				return $obj.text();
			}
		}
		this.test = {
			string : "this is an Explain object"
		};
		this.obj = $obj;
		this.hints = hints;
		this.insertText = insertText;

/*	var explanation = new Explain($('#hint'));

	return explanation;*/

	}
	return Explain;
});