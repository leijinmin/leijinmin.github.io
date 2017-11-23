$(document).ready(function(){
	var loadContent = function(jsonFile) {
			$.getJSON(jsonFile, function(json) {
				console.log(json);
			$("#quote .author").html(json.quote[1].author);
			$("#quote .quote-text").html(json.quote[1].content);

			$("#menu_1").html(json.menu.menu1);
			$("#menu_2").html(json.menu.menu2);
			$("#menu_3").html(json.menu.menu3);

			$("#about_me_1").html(json.about_me[0]);
			// $("#about_me_2").html(json.about_me[1]);
			// $("#about_me_3").html(json.about_me[2]);
			// $("#about_me_4").html(json.about_me[3]);
		});
	};

	loadContent("js/data_en.json");

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
 	// Change the lang menu content
	var changeLangMenu = function($self) {
				$('#lang ul li a').removeClass('selected');
				$self.addClass('selected');
				$('#lang > a:first-child').html($self.html());
				// $('#lang > a:first-child').text($self.text());
	};
	// Click on the language menu
	$('#lang ul li a').click(function(e) {
		if(!$(this).hasClass( "selected") ) {
			changeLangMenu($(this));
			loadContent("js/data_"+ $(this).text().trim() +".json");
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
