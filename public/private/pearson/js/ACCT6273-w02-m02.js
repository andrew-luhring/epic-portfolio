var lkOptions = {
	'development' : true,
	'title' : 'Identifying Strategic Implications in Accounting Data',
	'height' : 'auto',
	'school' : 'neu',
	'course' : 'ACCT6273',
	'module' : 'ACCT6273-w02-m02',
	'developer' : 'Andrew Luhring',
	'slideNumbers' : true,
	'fadeSlides': true,
	'hideControls' : true
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
	// rE = regular expression to test input against.
	var rE = /\d+/i;
	var idArr = [];
	var a;
	var b;

	//**********************************************
	// *******Function Section*********************
	//**********************************************
	hide_preloader();
	//first hide the return button by adding class hide so you can later remove it using switchClass("hide", "show") rather than css("display", "block").
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

	//add class hide to the magical lk-intro slide that appears out of nowhere so you can load it correctly.
	$('#lk-intro').addClass("hide");
	//function that removes class hide from lk-intro, inserts it to the correct place and then adds class hide to lk-footer to prevent incorrect navigation.
	function magic() {
		$('#lk-intro').removeClass("hide");
		$("#lk-header").after($('#lk-intro'));
		$("#lk-footer").addClass("hide");
	}
	//export table to csv function
	function exportTableToCSV($table, filename) {
		var $rows = $table.find('tr:has(td)'),
		// Temporary delimiter characters unlikely to be typed by keyboard
		// This is to avoid accidentally splitting the actual contents
		tmpColDelim = String.fromCharCode(11), // vertical tab character
		tmpRowDelim = String.fromCharCode(0), // null character
		// actual delimiter characters for CSV format
		colDelim = '","', rowDelim = '"\r\n"',
		// Grab text from table into CSV formatted string
		csv = '"' + $rows.map(function(i, row) {
			var $row = $(row), $cols = $row.find('td');
			return $cols.map(function(j, col) {
				var $col = $(col), text = $col.text();
				return text.replace('"', '""');
				// escape double quotes
			}).get().join(tmpColDelim);
		}).get().join(tmpRowDelim).split(tmpRowDelim).join(rowDelim).split(tmpColDelim).join(colDelim) + '"',
		// Data URI
		csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
		$(this).attr({
			'download' : filename,
			'href' : csvData,
			'target' : '_blank'
		});
	}




	//**********************************************
	// *******Event Section*************************
	//**********************************************
	
	
	
	
	//set timeout to 1 millisecond because it takes at least that long for lilkev to run.
	setTimeout(magic, 1);

	//on click of the intro slides begin navigation button, remove the hide class from lk-footer.
	$('.slidesContainer').click(function() {
		if ($('#lk-footer').hasClass("hide")) {
			$('#lk-footer').removeClass("hide");
		}

	});
	$('input').keydown(numbersOnly);
	//In terms of validation of input this^ assumes text will be entered with a keyboard. if you copy paste text it circumvents the validation

	//on click of a button with a class of calculate, check to see if all inputs are valid using rE.
	$('.calculate').click(function() {
		//set limit to equation (only numbers between limit low and limit high can be accepted.)
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
							}).text("Please enter a number between 6.80 and 10.00;");
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
							if (a === true && b === true) {
								$(this).addClass("nextSlide");
							} else {
								$(this).removeClass("nextSlide");
							}
						} else {
							$('.eq2Output1').text("error");
							$('#dialog').dialog({
								modal : true,
								dialogClass : "dialog",
								closeOnEscape : true,
								closeText : "click to close",
								hide : "slide",
								show : "slide"
							}).text("You have to enter in your estimate for the Volume for Competitors if Lillie Tissages is at FF 20, and the competitors are at FF 15!");
							a = false;
						}
						break;
					case 2:
						if ($inptVal >= limitLow2 && $inptVal <= limitHigh2 && $inptVal.match(rE)) {
							$('.inputVar3').text($inptVal);
							var totalCont2 = $inptVal * contMet2;
							$('.eq2Output2').text(totalCont2);
							b = true;
							if (a === true && b === true) {
								$(this).addClass("nextSlide");
							} else {
								$(this).removeClass("nextSlide");
							}

						} else {
							//setting a and b false here prevents nextSlide from continuing to be on this button if either of the values are changed and become invalid.
							$('.eq2Output2').text("error");
							a = false;
							b = false;
							$('.eq2Output1').text("error");
							$('#dialog').dialog({
								modal : true,
								dialogClass : "dialog",
								closeOnEscape : true,
								closeText : "click to close",
								hide : "slide",
								show : "slide"
							}).text("You have to enter in your estimate for the Volume for Competitors if Lillie Tissages is at FF 20, and the competitors are at FF 20!");

							$(this).removeClass("nextSlide");
						}
						break;

					default:
						//remove nextSlide by default.
						if ($(this).hasClass("nextSlide")) {
							$(this).removeClass("nextSlide");
						}
						break;
				} //end switch
			} //end if
		} // end forloop
	});
});
$(document).ready(function() {


	// This must be a hyperlink
	$(".export").on('click', function(event) {
		// CSV
		exportTableToCSV.apply(this, [$('#slide5 .clipboard > table'), 'tables.csv']);

		// IF CSV, don't do event.preventDefault() or return false
		// We actually need this to be a typical hyperlink
	});
});

function init() {
}
