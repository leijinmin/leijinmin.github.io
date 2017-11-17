$(document).ready(function(){
	$.getJSON("js/data.json", function(json) {
		$("#quote .author").html(json[0].author);
		$("#quote .quote-text").html(json[0].content);
	});

	// As click on the portfolio menu, the tab and tab panel change accordingly
	$('a.portfolioMenu').click(function(e) {
		if($(this).text()!== 'Desgin Patterns') {

			$('a.portfolioTab').parent('li').removeClass('active');
			var $selectedTab = $("a.portfolioTab:contains(" + $(this).text() + ")");
			$selectedTab.parent('li').addClass('active');

			$('.tab-pane').removeClass('active');
			var idName = $selectedTab.attr('href');
			$(idName).addClass('active');
		}
	});

	$("form").submit(function() {
		try {
			emailjs.send("leijinmin_gmail_com", "template_bGpCNhcZ",
			{"reply_to":$("#email").val(),
			 "from_name":$("#name").val(),
			 "to_name":"leijinmin@gmail.com",
			 "message_html":$("#phone").val() + $("#message").val()});
			$("#error").text("I will contact you soon!");
		}
		catch(err) {
    		$("#error").text("You e-mail is not sent out successfully!");
		}
		return false;
	});
});
