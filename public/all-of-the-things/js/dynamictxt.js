					//prevent button font from being too big for flexbox (the word illustrations specifically)
					//this is ridiculously bloated (so many nested ifs) but it works and I don't feel like beautifying it right now.
					

					function textResize(){
					$('a p').each(function(){
						paragraphs.push(this);
						var x = paragraphs.indexOf(this);
						var pw = paragraphs[x].scrollWidth;
						var parent = $(paragraphs[x]).parent('div').parent().innerWidth();
						var fontPre = $(this).css("font-size");
						var pwidth = parent - pw;  
						
						var fp = $(this).css("font-size"); var parInt = parseInt(fp, 10); var subt = parInt - 1; var addSz = parInt + 1;
							
						console.log("a");
						if(pwidth <  25 ){
							console.log("b");

								if( pwidth > 15) {
										$(this).animate({
										"font-size" : parInt
										}, 500); 
										console.log("c");	
								} else {
										$(this).animate({
										"font-size" : subt
										}, 500);
										console.log("d");
								}

						} else if( pwidth > 25 ) {
							console.log("e");
							fp = $(this).css("font-size");
							parInt = parseInt(fp, 10);
//							
							if ($(this).is( $("a, p, div").hasParent(".workTypes")) ) {
//^^^^^ .parent isnt right... because it's saying this is the parent of a p or div instead of a p div with the parent
								console.log("f");
								
									if(pwidth < 100 && parInt <= 32){
											
											$(this).animate({
											"font-size" : addSz
										}, 500); 
										console.log("g");
									} 
									
									else if (pwidth > 100 && parInt <=32 ){
										$(this).animate({
										"font-size" : (addSz + 2)		
										},500);
										console.log("h");
									}
									
									 
									if (parInt > 32){
									parInt = 32;
								} 
							} else if ($(this).is( $("a, p, div").hasParent("footer")) ) {
								console.log("i");
										if(pwidth < 100 && parInt <= 16){
											var addSz = parInt + 1;
											$(this).animate({
											"font-size" : addSz
										}, 500);
										console.log("j");
									} else{
										$(this).animate({
										"font-size" : parInt		
										},500);
										console.log("k");
									}
										if (parInt > 16){
									parInt = 16;
								} 
							}
							
						}

						var txt = paragraphs[x].innerText;
						console.log( txt + ": pw is " + pw + ", parent is " + parent +" , pwidth is" + pwidth + " , font size is " + parInt + "px " + '\n \r');
						
					});
					}

$("body").click(function(){
	var $attrchange = $('galleryDiv a, footer a');
	//
	//ALL YOU NEED TO DO NOW IS CHANGE WINDOW TO ATTRCHANGE BUT NOT
	//evidently the way you just did it...u need to access 'parent' because that selects the current one.
});
	