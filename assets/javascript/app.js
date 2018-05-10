$(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function () {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function () {
	$("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function () {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");

	if ($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	};

	$("#status-options").removeClass("active");
});

function newMessage() {
	message = $(".message-input input").val();
	if ($.trim(message) == '') {
		return false;
	}
	$('<li class="sent"><img src="assets/media/male_headshot.jpg" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	$('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height() }, "fast");
};

$('.submit').click(function () {
	newMessage();
});

$(window).on('keydown', function (e) {
	if (e.which == 13) {
		newMessage();
		return false;
	}
});

$(function () {
	var Accordion = function (el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		// Variables privadas
		var links = this.el.find('.link');
		// Evento
		links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
	}

	Accordion.prototype.dropdown = function (e) {
		var $el = e.data.el;
		$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}

	var accordion = new Accordion($('#accordion'), false);
});

//API Dropbox starts here
$("#apiDrop").on("click",function(){  


   // Get the modal
//    var modal = document.getElementById('myModal');

   // Get the button that opens the modal
   var btn = document.getElementById('apiDrop')

   // Get the <span> element that closes the modal
   var span = document.getElementsByClassName("close")[0];

   // When the user clicks the button, open the modal 
   btn.onclick = function () {
	   modal.style.display = "block";
   }

   // When the user clicks on <span> (x), close the modal
   span.onclick = function () {
	   modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function (event) {
	   if (event.target == modal) {
		   modal.style.display = "none";
	   }
   }
 


   $("#apiUIWrapper").css('display', 'none')
   var title = 'Avengers'


   $("#gifsBtn").on("click", function () {

	   $("#gifsBtn").css('display', 'none')
	   $("#moviesBtn").css('display', 'none')
	   $("#apiUIWrapper").css('display', 'inherit')

	   $("#searchBtn").on("click", function () {

		   title = $("#searchBar").val().trim()

		   var apiKey = '9RsoHb5hiRrXeoIELy3wuORx8T83KmFk';
		   var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=" + apiKey + "&limit=10";

		   $.ajax({
			   url: giphyQueryURL,
			   method: "GET"
		   }).then(function (response) {
			   $(".gif").empty();
			   for (var i = 0; i < 10; i++) {
				   var gifDiv = $("<div class='gif'>").css('float', 'left');

				   var gifImg = response.data[i].images.fixed_height.url;

				   var gif = $("<img class='ajaxImages' src=" + gifImg + ">");

				   gifDiv.append(gif);


				   $("#apiContent").prepend(gifDiv);
				   console.log(response);
			   }

		   });

	   })


   })
   $("#moviesBtn").on("click", function () {

	   $("#gifsBtn").css('display', 'none')
	   $("#moviesBtn").css('display', 'none')
	   $("#apiUIWrapper").css('display', 'inherit')

	   $("#searchBtn").on("click", function () {

		   title = $("#searchBar").val().trim()


		   var omdbQueryURL = "https://www.omdbapi.com/?s=" + title + "&y=&plot=short&apikey=trilogy"

		   $.ajax({
			   url: omdbQueryURL,
			   method: "GET"
		   }).then(function (response) {



			   $(".mov").empty();
			   for (var i = 0; i < 10; i++) {
				   var movDiv = $("<div class='mov'>").css('float', 'left');

				   var movImg = response.Search[i].Poster;

				   var mov = $("<img class='ajaxImages' src=" + movImg + ">");

				   movDiv.append(mov);


				   $("#apiContent").prepend(movDiv);

				   console.log(response.Search[i].Poster);

			   }
		   });

	   })
   })

})