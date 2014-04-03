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

				];
		var interval = window.setInterval;
		this.test = {
			string : "this is an Explain object"
		};
		this.obj = $obj;
		this.hints = hints;

		function insertText(str, testapi){
			$($obj).text(str);
			if(testapi === true){
				//console.log("true");
				return $obj.text();
			}
		}
		this.insertText = insertText;

		function explainHints(time, testapi, callback){
			//console.log(hints);
			var ok = false
				, index = 0
				, returnTxt = [];
			interval(function(){
				if(ok === false ){
					ok = true;
				} else {
					var length = hints.length;
					if(index < length){
						insertText(hints[index], true);
						returnTxt.push(hints[index]);

						ok = false;
						index++;
					}

				}

			} , time);
			if(testapi === true){
				if(callback){callback();}
				return $obj.text();
			}
		}
		this.explainHints = explainHints;

/*	var explanation = new Explain($('#hint'));

	return explanation;*/

	}
	return Explain;
});