jQuery(document).ready(function($) {
	var li = $.makeArray($('#content li'));
	var addLis = (function() {
		for (var i = li.length + 1; i <= 10; i++) {
			$("#content ul").append("<li>Item " + i + "</li>");
			li = $('#content li');
		}
	})();
	function removeLis() {
		if (li.length > 5) {
			$(li).filter(" li:even").remove();
			li = $('#content li');
		}
	}
	function appendLink(selector, content) {
		var $obj = $(selector);
		$obj.append(content);
	}
	appendLink("#footer", "<a class='append' href='#'>Click Me!</a>");


	$(".append").click(function(event) {
		event.preventDefault();
		removeLis();
	});
	$("section a").click(function(event){
		event.preventDefault();
		var $this = $(this);
		$this.href = $this.attr("href");
		$.ajax({
			url : $this.href,
			dataType: "text"
			}).done( function(data){
			$("#code code").text(data);
		}).error(function(data){
			alert("sorry");
		});

	})

});

