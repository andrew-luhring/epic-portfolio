var lkOptions = {
	'development': true,
	'title' : 'Identifying Strategic Implications in Accounting Data',
	'school' : 'neu',
	'course' : 'w02-m02',
	'module' : 'ACCT6273-w02-m02',
	'developer' : 'Andrew Luhring',
	'showSlide' : 'drop',
	'slideNumbers' : true,
	'development' : true,
	'currentPosition' : 1
};


$(document).ready(function($) {

	//**********************************************
	// *******global variable declarations**********
	//**********************************************

	//if you need to change the competitors price variables for some reason here's the hook into them:
	var v1 = 15.00;
	var v2 = 20.00;
	//if you need to change the limits (numbers accepted) here's a hook for the first equation:
	var limitLow1 = 6.80;
	var limitHigh1 = 10.00;
	//second equation:
	var limitLow2 = 0;
	var limitHigh2 = 700000;

	var contMet1;
	var contMet2;
	// You might be weirded out by the $ before my variables- I do that so I can keep track of whether they're javascript variabls or jquery variables.
	//store all slides in an array.
	var $slidArr = $.makeArray($(".slide"));
	//store all slides with an input box in an array
	var $inptArr = $.makeArray($('.slide input:text'));
	var $inpt, $sli;
	// rE = regular expression to test input against. notice how I'm whitelisting rather than blacklist.
	var rE = /\d+/i;
	var idArr = [];
var a;
var b;
	

	//**********************************************
	// *******Function Section*********************
	//**********************************************
	hide_preloader();
	//for each input, grab its' parent slides' id,  use the parent slides' id to select the input's sibling next button, add class of calculate to the input sibling's next button
	for (var i = 0; i < $inptArr.length; i++) {
		$inpt = $inptArr[i];

		$sli = $($inpt).parents('.slide');

		$($sli).addClass("hasInput");
		idArr.push($sli);

		$($sli).children('.next').addClass("calculate");
	}
	//for each slide, if it does not have an input insert class .nextSlide so lilKev will work on it.
	for (var i = 0; i < $slidArr.length; i++) {
		$sli = $slidArr[i];
		if ($($sli).hasClass("hasInput")) {

		} else {
			$($sli).children('.next').addClass("nextSlide");
		}

	}
	//hook into the equation input variables in case they need to change.
	$('.eq1Var1').text(v1);
	$('.eq1Var2').text(v2);

	//**********************************************
	// *******Event Section*************************
	//**********************************************

	$('input').keydown(numbersOnly);
	//In terms of validation of input this^ assumes text will be entered with a keyboard. if you copy paste text it circumvents the validation
	//that being said; it is pretty cool :-)
	//on click of a button with a class of calculate, check to see if all inputs are valid using rE.
	//note: this function is acting on all of the inputs only temporary- next i'll make it more specific to the slide.

	$('.calculate').click(function() {
		//set limit to equation (only numbers between limit low and limit high can be accepted.)
		//TODO hook into the inputs to set the limit...actually that seems like a bad idea... maybe.
		$('#limitLow').text(limitLow1);
		$('#limitHigh').text(limitHigh1);

		//figure out which slide is the clicked next buttons' parent
		var $sliParent = $(this).parents('.slide').attr("id");

		for (var i = 0; i < $inptArr.length; i++) {
			$inpt = $($inptArr[i]);
			var $inptVal = $inpt.val();
			//value of each inputs' parent slide number (so can be used in comparison).
			var $sliGen = $inpt.parents('.slide').attr("id");
			//if input values are valid by global standards- meaning, in this case that they contain at least one valid number.
			// AND
			//if the current slide matches the slide of the next button that was clicked.
			if ($sliGen === $sliParent) {
				switch(i) {
					//if we're on first slide with input, if the inputs are numeric and between 6.8 and 10.0, calculate contribution per meter, write the calculations to the next slide and add the nextSlide class to this- the button that was clicked.
					case 0:

						if ($inptVal >= limitLow1 && $inptVal <= limitHigh1 && $inptVal.match(rE)) {
							$('.inputVar1, .eq1Var1a, .eq1Var2a').text($inptVal);
							contMet1 = v1 - $inptVal;
							contMet2 = v2 - $inptVal;
							$('.eq1Output1').text(contMet1);
							$('.eq1Output2').text(contMet2);
							$(this).addClass("nextSlide");
							//if any of the above are not true, remove nextSlide class from button-- which is what navigates to the next slide, write errors to the next slide just in case the user magically gets to see it and open a dialog box
						} else {
							if ($(this).hasClass("nextSlide")) {
								$(this).removeClass("nextSlide");
							}
							$('.eq1Output1').text("error");
							$('.eq1Output2').text("error");
							$('#dialog').dialog({
								modal : true,
								dialogClass : "dialog",
								closeOnEscape : true,
								closeText : "click to close",
								hide : "slide",
								show : "slide"
							}).text("Answer must be between 6.80 and 10.00;" + "\n" + "Maybe check your decimel?" + " \n" + "It happens to the best of us ;-) ");
						}
						break;
					//if we're on input slide 2/3 (same slide just 2 inputs on it), if inputVar2 is valid calculate total contribution.
					case 1:
						if ($inptVal >= limitLow2 && $inptVal <= limitHigh2 && $inptVal.match(rE)) {
							$('.inputVar2').text($inptVal);
							var totalCont1 = $inptVal * contMet1;
							$('.eq2Output1').text(totalCont1);
							a = true;
							//if  a (this input) is true (meaning valid) and if b (next input) is also true (meaning valid) add class nextSlide. else remove it.
							//TODO : simplify these cases; the a b checking thing is totally not the best way to do this.
							if (a === true && b === true) {
								$(this).addClass("nextSlide");
								console.log(a + " " + b);
							} else {
								$(this).removeClass("nextSlide");
								console.log(a + " " + b + " ano");
							}

						} else {
							$('.eq2Output1').text("error");
							console.log("errora");
							a = false;
						}
						break;

					case 2:
						if ($inptVal >= limitLow2 && $inptVal <= limitHigh2 && $inptVal.match(rE)) {
							$('.inputVar3').text($inptVal);
							var totalCont2 = $inptVal * contMet2;
							$('.eq2Output2').text(totalCont2);
							console.log("trueb");
							b = true;
							if (a === true && b === true) {
								$(this).addClass("nextSlide");
								console.log(a + " " + b);
							} else {
								$(this).removeClass("nextSlide");
								console.log(a + " " + b + " bno");
							}

						} else {
							//setting a and b false here prevents nextSlide from continuing to be on this button if either of the values are changed and become invalid.
							$('.eq2Output2').text("error");
							console.log("errorb");
							a = false;
							b = false;
							console.log(a + " " + b + " ab no");
							$(this).removeClass("nextSlide");
						}
						break;

					default:
						//remove nextSlide by default.
						console.log("error");
						if ($(this).hasClass("nextSlide")) {
							$(this).removeClass("nextSlide");
						}
						break;
				} //end switch

			} //end if
		} // end forloop 
		//TODO: remove all the stuff within the for loop that doesn't need to be iterated over and make them into individual functions. this would be hell to change. 

	});

	$('body').lilkev(lkOptions);

});

function init() {
}
