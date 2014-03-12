var height = window.innerHeight;
var width = window.innerWidth;
var imgArray = [];
var imgs = document.getElementsByTagName("img");
var section;

jQuery(document).ready(function($) {

	for (var i = 0; i < imgs.length; i++) {
		imgArray.push(imgs[i]);
	}

	$(window).resize(function() {
		width = window.innerWidth;
		for (var i = 0; i < imgArray.length; i++) {
			var sec = imgArray[i].width = width / 4.2;
			section = (sec * 4) + 20;
		}
		$('section').css("border", "10px solid #000").css("width", section);
	});
});
/*



						if(pwidth <  25){
							
								var fp = $(this).css("font-size"); var parInt = parseInt(fp, 10); var subt = parInt - 1;
								
								$(this).animate({
								"font-size" : subt
								}, 500); 

						} else if( pwidth > 25 ) {
							$(this).css("background-color", "white");
							
							var fp = $(this).css("font-size");
							var parInt = parseInt(fp, 10);
							if(pwidth < 30){
									var addSz = parInt + 1`;
									$(this).animate({
									"font-size" : addSz
								}, 500); 
							} else{
							$(this).animate({
							"font-size" : parInt		
								}, 500); 	
							}
						}
						var txt = paragraphs[x].innerText;
						console.log(pw + " , "  + txt + "," + parent +" , " + pwidth);*/
