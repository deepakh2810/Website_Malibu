$(document).ready(function(){
	var $pagination = $('#pagination'),
		totalRecords = 0,
		records = [],
		displayRecords = [],
		recPerPage = 3,
		page = 1,
		totalPages = 0;

	function load_global_variables(reload) {
		$.ajax({
			url: "load_comments.php",
			async: true,
			dataType: 'json',
			success: function (data) {
				records = data;
				console.log(records);
				totalRecords = records.length;
				totalPages = Math.ceil(totalRecords / recPerPage);
				apply_pagination(reload);
			}
		});
	}

	$("#add_comment").click(function() {
		console.log("Clicked add_comment");
		current_user_id = 1;
		if (localStorage.getItem('user_id'))
		{
			current_user_id = localStorage.getItem('user_id');
		}
		var dataString = 
		{
			"name": $("#user_comment_name").val(),
			"email": $("#user_comment_email").val(),
			"message": $("#user_comment_message").val(),
			"rating": $("#user_comment_rating").val(),
			"user_id": current_user_id
		}

		dataString = JSON.stringify(dataString);
		$.ajax({
			url: 'save_comment.php',
			data: {myData: dataString},
			type: 'POST',
			success: function(response) {
				console.log("Saved comment");
				load_global_variables(true);
				$("#user_comment_name").val('');
				$("#user_comment_email").val('');
				$("#user_comment_message").val('');
				$("#user_comment_rating").val('');

				var ratings = document.getElementsByClassName("star active");
				for (var i = ratings.length-1; i >= 0; i--)
				{
					$(ratings[i]).attr('class', 'star');
				}
			}
		});		
	});

	load_global_variables(false);

	function generate_table() {
		var div;
		var ul;
		$('#comment_abhi').html('');
		console.log("Changing comments");
		for (var i = 0; i < displayRecords.length; i++) {
			div = $('<div class="col-sm-4 comment-edit" id="c'+i+'"><div/>');
			ul = $('<ul class="list-group"></ul>');

			ul.append('<li class="list-group-item list-group-item-info" id="c_user'+i+'">' + displayRecords[i].username + '</li>');
			var star;
			var data = '';
			for (star=0; star<displayRecords[i].rating; star++)
			{
				data += '<span class="fa fa-star checked"></span>';
			}
			for (; star<5; star++)
			{
				data += '<span class="fa fa-star"></span>';
			}

			ul.append('<li class="list-group-item" id="c_rating'+i+'">' + data + '</li>');
			ul.append('<li class="list-group-item subject-overflow" id="c_message'+i+'">' + displayRecords[i].message + '</li>');
			div.append(ul);
			$(ul).click(function() {
				var elements = $(this).find("li");
				// $(this).children('ul').each(function() {
				// 	console.log("Clicked: " + $(this).html());
				// });
				$("#modal-title").html($(elements[0]).html() +"'s comment");
				$("#user_rating").html($(elements[1]).html());
				$("#user_message").html($(elements[2]).html());
				// console.log($("#c_message0").html());
				$("#myModal").modal();
			});
			// console.log(div);
			$('#comment_abhi').append(div);
		}
		// load_events();
	}	

	function apply_pagination(reload) {
		console.log("Applying pagination");
		if (reload) {
			console.log("Reload true");
			displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
			endRec = (displayRecordsIndex) + recPerPage;
			// console.log(displayRecordsIndex + ' ssssssssss '+ endRec);
			displayRecords = records.slice(displayRecordsIndex, endRec);
			generate_table();
		}
		else {
			$pagination.twbsPagination({
				totalPages: totalPages,
				visiblePages: 5,
				onPageClick: function (event, page) {
					console.log("Clickled page " + page);
					displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
					endRec = (displayRecordsIndex) + recPerPage;
					// console.log(displayRecordsIndex + ' ssssssssss '+ endRec);
					displayRecords = records.slice(displayRecordsIndex, endRec);
					generate_table();
				}
			});
		}
	}

	$("#reserve-now").click(function() {		
		user_id = 0;
		if (localStorage.getItem("user_id")) {
			user_id = localStorage.getItem("user_id");
		}
		console.log("Clicked reservation");
		var reservation_details = 
		{
			"reg_name": $("#reg_name").val(),
			"reg_phone": $("#reg_phone").val(),
			"reg_date": $("#reg_date").val(),
			"reg_email": $("#reg_email").val(),
			"reg_number": $("#reg_number").val(),
			"reg_time": $("#reg_time").val(),
			"user_id": user_id
		}
		reservation_details = JSON.stringify(reservation_details);

		$.ajax({
			url: 'reservation.php',
			data: {userData: reservation_details},
			type: 'POST',
			success: function(response) {
				console.log("Reservation result: " + response);
				if (response == "Success")
				{
					$("#simpleInfo-title").html("<h4>Information from Malibu Grill</h4>");
					$("#simpleInfo-body").html("<p>Reservation successful!<p>");
					$("#simpleInfo").modal();
					
					$("#reg_name").val('');
					$("#reg_phone").val('');
					$("#reg_date").val('');
					$("#reg_email").val('');
					$("#reg_number").val('');
					$("#reg_time").val('');
				}
			}
		});		
	});

});