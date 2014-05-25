define ( [
			 'jquery'
			 , 'mixitup'
		 ], function ( $, mixitup ) {
	"use strict";

	var Card = function () {

		var card = $ ( '.flashcard' )
			, _arr = $.makeArray ( card );
		card.arr = _arr;

		card.group = function ( num ) {

			function grouped( obj, index, newclass ) {
				for ( var i = 0; i < num; i++ ) {
					$ ( card ).eq ( index - i ).addClass ( newclass );
				}
			}


			$.each ( card.arr, function ( index ) {

				$(card ).eq(index ).attr("data-order", index);
				if ( index % num === 0 && index !== 0 ) {
					var $jqCard = $ ( card ).eq ( index )
						, className = "group-" + index / num;

					grouped ( $jqCard, index, className );

					$ ( '.' + className ).wrapAll ( '<div class="group" />' );
				}
			} );
		};
		return card;
	};
	$ ( document ).ready ( function () {

		$('.flashcard' ).addClass('mix' );
		var card = new Card ();
		card.group ( 3 );
	} );

	$('.main' ).mixItUp();

} );