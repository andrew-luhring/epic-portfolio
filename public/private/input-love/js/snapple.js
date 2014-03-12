
$("html").removeClass("no-js");

$(document).ready(function($) {
	function feedback(selector, index, type) {
		if (type === "error") {
			$(selector).eq(index).addClass("error");
		} else {
			if ($(selector).eq(index).hasClass("error")) {
				$(selector).eq(index).removeClass("error");
			}
		}
	}
	(function ieForm() {
		var $page = $("html");
		if($page.hasClass("lte-ie9")){
			$("#loginform input.credentials-input").focusin(function() {
				var $current = $(this),
				id = $current.attr("id"),
				label = "label[for='" + id + "']" ,
				$label = $(label);
				$label.addClass("hide");
			});
			$("#loginform input.credentials-input").focusout(function() {
				var $current = $(this),
				$value = $current.val(),
				id = $current.attr("id"),
				label = "label[for='" + id + "']" ,
				$label = $(label);
				if ($value === "" || $value === "undefined") {
					$label.removeClass("hide");
				}
			});
		}
	})();
function validate($requestForm) {
		var $input = $requestForm.find("input[name]"),
			isEmpty = [],
			continueSubmit = false,
			emptyIndex;
		$input.each(function(index) {
			var $current = $(this), $values = $current.val();
			if ($values === "" || $values === "undefined") {
				isEmpty.push(true);
				var type = "error";
				if($("#loginform").hasClass("reality")){
					feedback($input, index, type);
				}
			} else {
				isEmpty.push(false);
				var type = "success";
				feedback($input, index, type);
			}
		});
		if ($.inArray(true, isEmpty) !== -1) {
			alert("an alert message!");
		} else {
			continueSubmit = true;
			serializeTheThings($requestForm);
		}
};
function serializeTheThings(requestForm) {
		var $current = $(requestForm),
		data = {},
		method = $current.attr("method"),
		location = $current.attr("action"),
		crossDomain = true,
		$params = $current.find("input[name]");
		$params.each(function() {
			var index = $(this),
			name = index.attr("name"),
			value = index.val();
			data[name] = value;
		});
		request($current, crossDomain, data, method, location);
}

function showSpec(){
		var $creds = $("figure.credentials-requirement"),
		$spec = $("cite.spec");
		if($spec.data("hidden")){
			$spec.data("hidden", false).text("hide spec");;
			$creds.stop("true","true").slideDown(1000).removeClass("hide").removeClass("none");
		} else{
			$spec.data("hidden", true).text("specifications:");
			$creds.stop("true","true").slideUp(1000, function(){
				$(this).addClass("hide").addClass("none");
			})

		}
	}



function changeRequirements(reqSrc, reqTxt){
	var $req = $(".credentials-requirement"),
		 $reqImg = $req.find("img");
	$reqImg.attr({
		src : reqSrc,
		alt : reqTxt
	});
	$(".credentials-requirement").find("figcaption").text(reqTxt);
}


function switchFormStuff(a){
	if(a === true){
		$("#loginform, #loginform *").addClass('reality');
		$("#apple_id").attr({
			type : "email",
			maxlength : 70,
		});
		$("#apple_pw").attr("maxlength", 70);
	} else {
		if($("#loginform, #loginform *").hasClass("reality")){
				$("#loginform, #loginform *").removeClass('reality');
		}
		$("#apple_id").attr("type", "text").removeAttr('maxlength');
	}
	if ($("#loginform").hasClass("hide") || $("#loginform").hasClass("none")){
		$("#loginform, #loginform *, header.credentials-requirement").removeClass('hide').removeClass("none");
	}
}


	$("#loginform, .credentials-requirement").addClass("hide").addClass("none");
	$("#specificity-form").removeClass("none").removeClass("hide");
	$("cite.spec").click( function(){
		showSpec();
	});
	$("input:radio[name='specificity']") .change(function() {
		$("figure.credentials-requirement").addClass("hide");
		$("cite.spec").data("hidden", "true").text("specifications");
		var specify = $(this).val(),
		reqSrc,
		reqTxt;
		switch(specify){
			case "written-spec":
				reqSrc = "images/written-requirements.png";
				reqTxt = "A screenshot of the written requirements section of the spec.";
				$("#loginform, header.credentials-requirement").slideUp("slow").hide("slow", function(){
						changeRequirements(reqSrc, reqTxt);
						a = false;
						switchFormStuff(a);
				}).slideDown("slow").show("slow");
				break;

			case "visual-spec":
				reqSrc = "images/visual-requirements.gif";
				reqTxt = "A slice from the specification's pdf exported via Illustrator CS5 .",
				$("#loginform, header.credentials-requirement").slideUp("slow").hide("slow", function(){
						changeRequirements(reqSrc, reqTxt);
						a = true;
						switchFormStuff(a);
				}).slideDown("slow").show("slow");
				break;
			default:
				$("#loginform, .credentials-requirement").addClass("hide").addClass("none").hide();
			break;
		}
	});
	$("#loginform").on("submit", function(event) {
		event.preventDefault();
		var $requestForm = $(this);
		validate($requestForm);
		return false;
	});
});

var request = function(form, crossDomain, data, method, location) {
	var appleid = data.appleid,
	applepw = data.applepw;
	$.ajax({
				crossDomain : crossDomain,
				type : method,
				url : location,
				data : data,
				username: appleid,
				password: applepw
			}).done(function(response, status, obj) {
				console.log("succeeded message");
					console.log(response);
					console.log(status);
					console.log(obj);
			}).fail(function(response, status, error) {
					console.log("failed message");
					console.log(status);
					console.log(error);
			});

};
