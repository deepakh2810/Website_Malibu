$(document).ready(function(){
	orderRecords = [],

	$("#sign-out").click(function() {
		window.location = "index.html";
		// $("#login-register").html("Login/Register");
		// $("#login-register").attr("data-toggle", "modal");
		localStorage.removeItem('user_id');
	});

	var userInfo = 
	{
		"user_id": localStorage.getItem("user_id")
	}
	userInfo = JSON.stringify(userInfo);

	console.log(userInfo);

	$.ajax({
		url: "profile_my_order.php",
		data: {userData: userInfo},
		async: true,
		dataType: 'json',
		type: 'POST',
		success: function (data) {
			orderRecords = data;
			// console.log(orderRecords);
			load_my_orders();
		}
	});

	$.ajax({
		url: "load_personal_information.php",
		data: {userData: userInfo},
		async: true,
		dataType: 'json',
		type: 'POST',
		success: function (data) {
			personalInformation = data;
			// console.log(orderRecords);
			load_personal_information(personalInformation);
		}
	});

	function load_personal_information(personalInformation)
	{
		console.log("Loading personal Information: " + personalInformation[0].First);
		$("#p_firstname").val(personalInformation[0].First);
		$("#p_lastname").val(personalInformation[0].Last);
		$("#p_apt").val(personalInformation[0].apt_num);
		$("#p_addr1").val(personalInformation[0].addr_1);
		$("#p_addr2").val(personalInformation[0].addr_2);
		$("#p_city").val(personalInformation[0].city);
		$("#p_state").val(personalInformation[0].state);
		$("#p_zip").val(personalInformation[0].zip);
		$("#p_phone").val(personalInformation[0].phone);
		$("#p_email").val(personalInformation[0].email);
	}

	$("#update").click(function() {
		var personalInfo = {
			"p_firstname": $("#p_firstname").val(),
			"p_lastname": $("#p_lastname").val(),
			"p_apt": $("#p_apt").val(),
			"p_addr1": $("#p_addr1").val(),
			"p_addr2": $("#p_addr2").val(),
			"p_city": $("#p_city").val(),
			"p_state": $("#p_state").val(),
			"p_zip": $("#p_zip").val(),
			"p_phone": $("#p_phone").val(),
			"p_email": $("#p_email").val(),
			"p_userid": localStorage.getItem("user_id")
		}
	
		personalInfo = JSON.stringify(personalInfo);
		$.ajax({
			url: "update_personal_information.php",
			data: {personalData: personalInfo},
			async: true,
			type: 'POST',
			success: function (data) {
				$("#simpleInfo-title").html("<h4>Mesage from Malibu Grill</h4>")
				$("#simpleInfo-body").html("<p>User Information updated successfully</p>")
				$("#simpleInfo").modal();
			}
		});

	});

	function load_my_orders()
	{
		$('#past_orders').html('');
		console.log("Loading Profile My Orders");
		// console.log(orderRecords);
		for (var i=0; i<orderRecords.length; i++)
		{
			var div = $('<div class="col-sm-4"></div>');
			var ul = $('<ul class="list-group my_order">');
			// console.log(orderRecords[i].o_time);
			var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
							"October", "November", "December"];
			var date = new Date(orderRecords[i].o_time);
			readable_date = days[date.getDay()] + " " + months[date.getMonth()] + "-" + date.getDate() + "-" + date.getFullYear()
							+ " at " + date.getHours() + ":" + date.getMinutes();
			ul.append('<li class="list-group-item" id="title"><h4>' + readable_date + '<h4></li>');
		
			var summary = JSON.parse(orderRecords[i].summary);
			var inner_div = $('<div id="order_body"></div>')
			for (iter=0;iter<summary.length;iter++) {
				// console.log(summary[iter]);
				summary_item_title = '<span class="summary-item-title">' + summary[iter].title + '</span>'
				summary_item_count = '<span class="summary-item-count"> x' + summary[iter].count +'</span>'
				summary_item_cost = '<span class="summary-item-cost"> $' + summary[iter].cost +'</span>'
				element = '<li class="list-group-item no_border">' + summary_item_title + summary_item_count
																   + summary_item_cost +'</li>';
				inner_div.append(element);
			}

			grand_total = '<li class="list-group-item no_border"><span id="price-total">Total Price:</span><span id="price-display">$' 
									+ orderRecords[i].total + '</span></li>'
			inner_div.append(grand_total)
			ul.append(inner_div);
			div.append(ul);
			console.log(i + ul);
			$('#past_orders').append(div);

			$(ul).click(function() {
				var title = $(this).find("#title");
				var order_body = $(this).find("#order_body");
				console.log(title);
				$("#modal-title").html($(title[0]).html());
				$("#modal-body").html($(order_body[0]).html());
				$("#myModal").modal();
			});
		}
	}

	$.ajax({
		url: "profile_my_comments.php",
		data: {userData: userInfo},
		async: true,
		dataType: 'json',
		type: 'POST',
		success: function (data) {
			commentRecords = data;
			// console.log(commentRecords);
			load_my_comments();
		}
	});

	function load_my_comments()
	{
		$("#past_comments").html('');
		console.log("Loading Profile My Comments");

		var div;
		var ul;
		console.log(commentRecords);
		for (var i=0; i<commentRecords.length; i++)
		{
			div = $('<div class="col-sm-4 "><div/>');
			ul = $('<ul class="list-group my_order"></ul>');

			ul.append('<li class="list-group-item list-group-item-info no_border" id="title">' + commentRecords[i].username + '</li>');

			var inner_div = $('<div id="comment_body"></div>')
			var star;
			var data = '';
			for (star=0; star<commentRecords[i].rating; star++)
			{
				data += '<span class="fa fa-star checked"></span>';
			}
			for (; star<5; star++)
			{
				data += '<span class="fa fa-star"></span>';
			}

			inner_div.append('<li class="list-group-item no_border">' + data + '</li>');
			inner_div.append('<li class="list-group-item no_border">' + commentRecords[i].message + '</li>');
			ul.append(inner_div);
			div.append(ul);
			$("#past_comments").append(div);

			$(ul).click(function() {
				var title = $(this).find("#title");
				var comment_body = $(this).find("#comment_body");
				console.log(title);
				$("#modal-title").html($(title[0]).html());
				$("#modal-body").html($(comment_body[0]).html());
				$("#myModal").modal();
			});
		}
	}

});