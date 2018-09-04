$(document).ready(function(){
    $("#signout").click(function () {
        localStorage.removeItem('user_id');
        window.location = "index.html";
    });

	$.ajax({
		url: "load_pending_orders.php",
		async: true,
		dataType: 'json',
		success: function (data) {
			orderRecords = data;
			load_pending_orders();
		}
	});

	function load_pending_orders()
	{
		$('#past_orders').html('');
		console.log("Loading Pending Orders");
		// console.log(orderRecords);
		if (orderRecords.length == 0)
		{
			$('#past_orders').css({'background-image': 'url(./img/OnlineFoodOrdering.png)',
									'background-repeat': 'no-repeat',
									'background-position': 'center'})
		}
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

			order_id = '<li class="list-group-item no_border hidden" id="hidden_order_id">' + orderRecords[i].pending_order_id + '</li>'

			inner_div.append(order_id)
			inner_div.append(grand_total)
			ul.append(inner_div);
			div.append(ul);
			console.log(i + ul);
			$('#past_orders').append(div);

			$(ul).click(function() {
				var title = $(this).find("#title");
				var order_body = $(this).find("#order_body");
				$("#modal-title").html($(title[0]).html());
				$("#modal-body").html($(order_body[0]).html());
				$("#myModal").modal();
				var order_id = $(this).find("#hidden_order_id");
				$("#deliver").click(function() {
					removeAndLoadItem(parseInt($(order_id[0]).html()));
				});
			});
		}
	}

	function removeAndLoadItem(order_id)
	{
		var orderInfo = 
		{
			"order_id": order_id
		}
		orderInfo = JSON.stringify(orderInfo);
		$.ajax({
			url: "update_pending_orders.php",
			data: {orderData: orderInfo},
			async: true,
			dataType: 'json',
			type: 'POST',
			success: function (data) {
				orderRecords = data;
				load_pending_orders();
				$("#myModal").modal("hide");
			}
		});
	}
});