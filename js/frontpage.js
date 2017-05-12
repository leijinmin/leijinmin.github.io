$(document).ready(function(){	
	$.getJSON("js/data.json", function(json) {
		$("#quote .author").html(json[0].author);
		$("#quote .quote-text").html(json[0].content);
	});   
});