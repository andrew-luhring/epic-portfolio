$('#slide4').data({'media':'cda5004c4a364ad4bbcc280833dca459'});
//$('#jp_container_2').data('caption','');
lkOptions = {
		'title':'Validity and Reliability of Tests',
		'school':'usc',
		'course':'w12-m01',
		'module':'PM512-w12-m01',
		'developer':'kevin',
		'showSlide':'drop',
		'slideNumbers': true,
		'development': false,
		'currentPosition': 1
	}
$('#slide7').data({
	'timing':{ 'nc-1': 0.5, 'nc-2': 9.5},
	'duration': 400,
	'hideEm': false,
	'startHidden': false,
	'setReturn': true
});
$('#slide8').data({
	'timing':{ 'cell-b': 28.5},
	'duration': 400,
	'hideEm': false,
	'startHidden': false,
	'setReturn': true
});	
$('#slide9').data({
	'timing':{ 'cell-d': 16},
	'duration': 400,
	'hideEm': false,
	'startHidden': false,
	'setReturn': true
});	
$('#slide15').data({
	'timing':{ 'rel1': 7.5, 'rel2':10, 'rel3':25, 'rel4': 42 },
	'duration': 400,
	'hideEm': false,
	'startHidden': false,
	'setReturn': true
});	
	function init(){
		
		$('input').val('');
		
		$('.validity-question, .validity-feedback, .validity-table').hide()
		$('.two-text-input-correct, .two-popup-container, .two-popup').hide()
		$('.fillin-feedback').hide();
		$('.kappa-popup, .kappa-correct').hide();
		
		
		$('.instructions-container').live('click', toggleInstructions)
		$('.val-click').live('click', clickValidity)
		$('.next-validity').live('click', nextValidity)
		
		
		
		$('.two-table-submit').live('click', checkTwoTable)
		$('.button.view-equation').live('click', openTwoPopup)
		$('.two-close-button').live('click', closeTwoPopup)
		
		
		$('.number-change').live('audioTrigger', beforeChangeNumbers)
		$('.highlight-me').live('audioTrigger', highlightCell)
		
		
		
		$('.fillin-submit').live('click', checkFillin)		
		
		$('.kappa-button').live('click', clickKappaButton)
		$('.kappa-answer').live('keydown', numbersOnly);
		$('.kappa-answer').live('keypress', clearIncorrect)
		//$('.add-percent').keyup(addPercent);
		$('.kappa-submit').live('click', checkKappa)	
		
		$('.reliability').live('audioTrigger', presentReliability)
		$('#slide15').live('audioTriggerBefore', beforePresentReliability)
		$('#slide15').live('audioComplete', removeActive)
	}
	
	function addPercent(e){
		var ans = $(this).val()
		
		if( ans.length == 2 ){
			$(this).val( ans + '%' );
		}
		//console.log(ans.length)
	}
	
	function toggleInstructions(){
		$(this).toggleClass('closed');	
		
		if( $(this).attr('id') == 'validity-instructions' ){
			if( !$('.validity-table').is(':visible') ){
				$('.validity-table').delay(400).fadeIn();
				$('#val-question-1').delay(400).fadeIn();
			}			
		}
	}
	
var validStep = 1
var validCorrectAnswer = { 
	1: { '1': 'vc11', '2': 'vc31' },
	2: { '1': 'vc22', '2': 'vc32' },
	3: { '1': 'vc11', '2': 'vc13' },
	4: { '1': 'vc22', '2': 'vc23' }
}
var validClicked = [];
	
	function clickValidity(){
		var id = $(this).attr('id');
		validClicked.push(id);
		
		$(this).toggleClass('selected')
		$('.validity-feedback').fadeOut(200)
		
		if( $('.val-click.selected').length <= 1 ){			
			return;	
		}
		
		if( validClicked[0] == validCorrectAnswer[validStep]['1'] && validClicked[1] == validCorrectAnswer[validStep]['2']  ){
			//console.log('Correct!');
			$('.correct.feedback-val-question-' + validStep ).delay(100).fadeIn();
		} else {
			//console.log('WRONG!');
			$('.incorrect.feedback-val-question-' + validStep ).delay(100).fadeIn();
			validClicked = [];
			$('.val-click.selected').removeClass('selected')
			//window.setTimeout(unselect, 1000);				
		}
	}
	function unselect(){
		$('.val-click.selected').removeClass('selected')
	}
	function nextValidity(e){
		e.preventDefault()
		
		validStep++;
		$('.validity-feedback').fadeOut(200)	
		$('.validity-question:visible').delay(400).fadeOut()
		$('#val-question-' + validStep ).delay(800).fadeIn();	
		$('.val-click.selected').removeClass('selected')
		
	}
var checkTwo = { 5: 0, 6: 0 }	
	function checkTwoTable(e){
		e.preventDefault()
		
		checkTwo[currentPosition] = checkTwo[currentPosition] + 1
			
		$('.two-text-input').each(function(){
			var stu = $(this).val()
			var ans = $(this).siblings('span').text()
			
			if( stu.charAt(0) == '.' ){
				stu = '0' + stu	
			}
			
			if( stu == ans || checkTwo[currentPosition] == 2 ){
				$(this).hide();
				$(this).siblings('span').show();
				$(this).parent().removeClass('incorrect').addClass('correct')	
			} else {					
				$(this).parent().removeClass('correct').addClass('incorrect')
			}			
		});
		
		if( $('td.correct:visible').length == 10 && currentPosition == 6 ){
			$('.two-popup-container').fadeIn()
			$('.two-feedback').delay(400).fadeIn();				
		}
	}
	
	function openTwoPopup(){
		var id = $(this).text().toLowerCase();
		$('.currentSlide .two-popup-container').fadeIn()	
		$('.currentSlide .two-popup-' + id ).delay(400).fadeIn()
	}
	
	function closeTwoPopup(){
		$(this).parents('.two-popup').fadeOut();
		$('.two-popup-container').delay(400).fadeOut();
		if( $(this).parents('.two-popup').is('.two-feedback') ){
			currentSlide.removeClass('hideNext')
			$('#lk-btn-next').show('pulsate', { times: 5 });	
		}
	}

	
	function beforeChangeNumbers(event, ids){
		var id = this.id
		
		if( $(this).is('.donezo') ){ return; }
		
		$(this).parent('td').addClass('highlight')
		$(this).addClass('donezo')
		
		setTimeout(changeNumbers, 1000, id )		
	}
	
	function changeNumbers(id){

		if( id == 'nc-1' ){			
			$('#' + id ).html('40');
			$('.from-a').addClass('highlight')			
		} else if( id == 'nc-2' ){
			$('#nc-1').html('40');
			$('#' + id ).html('20');
			$('.from-b').addClass('highlight')	
		}
		
		setTimeout(changeAutoNumbers, 1000, id)		
		//$('.number-change-auto').each(changeAutoNumbers)
		
	}
	function changeAutoNumbers(changedID){
		
		$('.number-change-auto').each(function(){
			var id = this.id
			var first = parseInt($('.nc-' + id.slice(0,1)).html())
			var second = parseInt($('.nc-' + id.slice(1,2)).html())
		
			$(this).html( first + second )			
		});
		
		$('.highlight').removeClass('highlight')	
		
	}
	
	function highlightCell(){
		$(this).addClass('highlight')	
	}
	
	
var fillinAnswers = {
	'1': '63',
	'2': '98'	
}
var fillinAttempts = {
	1: 0,
	2: 0	
}
	function checkFillin(e){
		e.preventDefault()
		var id = getID( $(this) )
		
		fillinAttempts[id]++
		
		if( fillinAttempts[id] == 2 ){
			$(this).parent('.sft').hide()
			$('#fillin-feedback-' + id ).fadeIn()			
		} else if( $('#fillin-' + id ).val() == fillinAnswers[id] ){
				
		} else {
			$('#fillin-' + id ).addClass('incorrect');	
		}
	}
	
var kappaAnswers = {
	'1': '92',
	'2': '73.1',
	'3': '.70'	
}		
	function clickKappaButton(e){
		e.preventDefault();
		var tar = $(this).attr('href')
		
		$('.kappa-popup:visible').fadeOut()
		$('.kappa-button.active').removeClass('active')
		if( $(tar).is(':visible') != true ){
			$(tar).fadeIn()	
			$(this).addClass('active')
		}
		
				
	}

	function checkKappa(e){
		e.preventDefault()
		
		var incomplete = false
		
		$('.kappa-answer').each(function(key, value){
			if( $(this).val() == '' ){
					incomplete = true
					$(this).addClass('incorrect')
			}
		})
		
		if( incomplete ){ return; }
		
		$('.kappa-answer').each(function(key, value){
			var id = getID($(this));
			var stu = $(this).val()
			

			if( kappaAnswers[id] == stu ){
				$(this).siblings('.kappa-correct').show()
				$(this).hide();
				$(this).siblings('.percent-sign').hide()
				if( id ==3 ){ $('.kt-right').hide() }
				
			} else {
				$(this).addClass('incorrect');	
			}
		});
			
	}
	
	function presentReliability(event, id){
		$('.reliability.active').not(this).removeClass('active')
		$(this).addClass('active')
			
	}
	function beforePresentReliability(event, ids){
		$('.reliability.active').removeClass('active')	
	}
	
function clearIncorrect(){
	$(this).removeClass('incorrect')	
}

function numbersOnly(event){	
	var key = event.keyCode	
	//console.log(key)			
	if( ( key < 48 || key > 57/*top numbers*/ ) && ( key < 96 || key > 105/*numpad*/ ) && key != 8/*backspace*/ && key != 190/*decimal*/ && key != 110/*numpad decimal*/ && key != 46/*delete*/ ){
		event.preventDefault()		
	}
}		

function removeActive(){
	$('.active:visible').removeClass('active');	
}
	
	
/*
========= Notes ==========

*- changed how lilkev options are set
- lilkev automatically adds the draggable fix for touch devices
- functions for hCenter and vCenter have been improved, shouldn't be as finicky
- added a class to replace adding both hCenter and vCenter to a single element ( .center )
- lilkev controls now control delve videos
*- complete overhaul of hubs (see notes below)
*- RE-added captions :/
- added new functions (see notes below)
- added new classes (see notes below)
- restyled playbar using school colors
- added popup bubble functionality 
- added hub flow diagram

========= Available Classes ==========
$('.resetSlide') - given to a button to perform a single slide 'reset'.  Will reset html only, for resetting javascript, see the 'slideReset' trigger


$('.hCenter') - will center the element horizontally in it's parent
$('.vCenter') - will center the element vertically in it's parent
$('.center') - will center both horizontally and vertically

$('.gradient') - will apply a gradient using the school's main color

========= Available Functions ==========

lkGradient( selector, color, starting point(0-1), ending point(0-1) )
	ex. lkGradient($('.button'), 'FFFFFF', 1, .5)
	applies a gradient to element, allowing more customization than simply assigning it the gradient class
	color and starting/ending point are optional, if not entered, will just default to school color
	
getID( selector )
	ex. var id = getID($(this))
	finds the last one or two digits of an element's id to give only a number value
	useful for click and reveals, different slide navigation.

centerMe( selector)
	ex. centerMe($('.center'))
	horizontally and vertically centers an element
	useful when the size of the element is dynamic
	
lkBalloon($('#lk-btn-next img'), 'Click the next<br> arrow to continue')


========= Available Triggers ==========

showSlide - occurs on every slide change, including slide1
videoComplete - occurs after the current video has finished playing
resetSlide - occurs after the reset button has been clicked ( used when resetting a single slide, must put all 'init' type javascript inside this function )



======== Examples ====================

	Captions for AUDIO player
$('#jp_container_2').data('caption','');
___________________________________
	
	Captions for VIDEO player
$('#slide2').data('caption','');
___________________________________

	Basic lkAnimate setup
$('#slide2').data({
	'timing':{ 'pa1': 0.5, 'pb1':3, 'pc1':4 },
	'duration': 400,
	'hideEm': false
});	
___________________________________

	Custom lkAnimate setup
$('#slide2').data({
	'timing':{ 'pa1': 0.5, 'pb1':3, 'pc1':4 },
	'duration': 400,
	'hideEm': false,
	'setReturn': true
});	

Use $('.p-class').live('audioTrigger', doSomething);

	'.p-class' can be anything to identify the elements that the function should run for


*/	
	
	