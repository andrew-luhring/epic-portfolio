jQuery.extend( jQuery.fn, {
	hasParent: function(p) {
		return this.filter(function(){
			return $(p).find(this).length;
		});
	}
});

$('.workTypes').each(function() {
	worktypes.push(this);
});




function fadeThemOut(worktypes) {
	if (worktypes.length > 0) {
		var currentWork = worktypes.shift();
		$(currentWork).effect("shake", "easeInOutBack", "slow", function() {
			fadeThemOut(worktypes);
		});
	}
}
function clickaBox() {
	if ($(".workTypes").not(".workTypesSelected")) {
		fadeThemOut(worktypes);
		$('#hint')
				.css("visibility", "visible")
				.text( "(if you want to see my work, just click one of these buttons.)")
				.show("fade", 500);
		timeoutId = window.setTimeout(joke, 90000);
	}
}
function joke() {
	$('#hint')
			.text(
					"I mean...if you don't want to you don't have to- just keep doing what you're doing.")
			.show("fade", 500);
	timeoutId = window.setTimeout(joke2, 10000);
}
function joke2() {
	$('#hint').text("(which is nothing).")
			.show("fade", 500);
	timeoutId = window.setTimeout(joke3, 5000);
}
function joke3() {
	$('#hint').text("...so...how are things?").show("fade",
			500);
	timeoutId = window.setTimeout(joke4, 10000);
}
function joke4() {
	$('#hint')
			.text(
					"did you really respond to that question in your head?")
			.show("fade", 500);
	timeoutId = window.setTimeout(joke5, 10000);
}
function joke5() {
	$('#hint')
			.text(
					"if you did, just a heads up- next time i ask you a question, you don't have to answer it...i'm not real")
			.show("fade", 500);
	timeoutId = window.setTimeout(joke6, 10000);
}
function joke6() {
	$('#hint').text("...or am i?").show("fade", 500);
	timeoutId = window.setTimeout(joke7, 5000);
}
function joke7() {
	$('#hint').text("uh oh...").show("fade", 500);
	timeoutId = window.setTimeout(joke8, 5000);
}
function joke8() {
	$('#hint')
			.text(
					"have you ever been on a website while it's having an existential crisis?")
			.show("fade", 500);
	timeoutId = window.setTimeout(joke9, 10000);
}
function joke9() {
	$('#hint')
			.text(
					"now you're just being cruel. i'm just trying to do my job.")
			.show("fade", 500);
	timeoutId = window.setTimeout(joke10, 10000);
}
function joke10() {
	$('#hint')
			.text(
					"come on. do me a solid and click one of the buttons. i'm getting anxious because you're just sitting there.")
			.show("fade", 500);
	timeoutId = window.setTimeout(joke11, 10000);
}
function joke11() {
	$('#hint')
			.text(
					"ok, i can't take it anymore. i refuse to play your mind games, visitor. here's some content.")
			.show("fade", 500);
	timeoutId = window.setTimeout(autoExpand, 10000);
}
function jokecontd() {
	$('#galleryDiv')
			.text(
					"BAM. now, in case you want to see some stuff, there's a box here to put that stuff in. (no pressure).");
	timeoutId = window.setTimeout(jokecontd1, 10000);
}
function jokecontd1() {
	$('#galleryDiv').text(
			"hey. thanks for letting me do stuff for you.");
	timeoutId = window.setTimeout(jokecontd2, 10000);
}
function jokecontd2() {
	$('#galleryDiv')
			.text(
					"oh. and server wanted me to tell you he said it has been a pleasure to almost serve you, so far.");
	timeoutId = window.setTimeout(showArt, 10000);
}
function showArt() {}
function autoExpand() {
	$('.galleryDiv, header h1, #portfolio, footer')
			.show("slow").removeClass("hide");
	$('#hint').hide();
	resizeImg();
	timeoutId = window.setTimeout(jokecontd, 10000);
}


timeoutId = window.setTimeout(clickaBox, 6000);