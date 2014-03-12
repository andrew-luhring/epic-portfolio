

// initialize in-field labels for form
$(function() {
	
	$("label").inFieldLabels();
	
}); 
	
	
// initialize form validation
$(function() { 
	
	var contactsch = $("#contact-sch");
	contactsch.validation();
	var enewsletter = $("#enewsletter");
	enewsletter.validation();
	
});
	

$(document).ready(function() {
	
	$(".enews-form").hide();
    $(".show-enews").show();
        
    $(".contact-form").hide();
    $(".show-contact").show();
 
    $('.show-enews').click(function() {
    	$(".enews-form").slideToggle();
    });
    
    $('.show-contact').click(function() {
    	$(".contact-form").slideToggle();
    });
    
	var contactheight = $("#content").height();
		$("#scholar-wrapper").css("height",contactheight);
});
    

// send form info, produce email
function submitForm() {
	$.ajax({type:'POST', url: '/forms/contactmail.php', data:$('#contact-sch').serialize(), success: function(response) {
		  $('#contact-sch').find('.form_result').html(response);
	}});
    return false;
}

function submitNewsletter() {
	$.ajax({type:'POST', url: '/forms/newsmail.php', data:$('#enewsletter').serialize(), success: function(response) {
		  $('#enewsletter').find('.newsform_result').html(response);
	}});
    return false;
}
        
    
    