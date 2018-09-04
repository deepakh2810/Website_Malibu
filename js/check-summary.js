$(document).ready(function() {
	order_summary = [
	{title: "Breakfast- Item", count: 7, id: 0, cost: "25"},
	{title: "Breakfast- Item1", count: 7, id: 1, cost: "25"},
	{title: "Breakfast- Item2", count: 6, id: 2, cost: "125"}
	];

	order_summary = localStorage.getItem('order_summary');

	new_summary = JSON.parse(order_summary);

	var iter;
	var grad_total = 0;
	for (iter=0;iter<new_summary.length;iter++) {
		summary_item_title = '<span class="summary-item-title">' + new_summary[iter].title + '</span>'
		summary_item_count = '<span class="summary-item-count"> x' + new_summary[iter].count +'</span>'
		summary_item_cost = '<span class="summary-item-cost"> $' + new_summary[iter].cost +'</span>'
		grad_total += (parseInt(new_summary[iter].cost) * parseInt(new_summary[iter].count));
		element = '<li class="list-group-item">' + summary_item_title + summary_item_count + summary_item_cost +'</li>';
		$("#order-summary").append(element);
	}
	$("#total-display").html("$" + grad_total);

    paypal.Button.render({

        // Set your environment

        env: 'sandbox', // sandbox | production

        // Specify the style of the button

        style: {
            label: 'checkout',
            size:  'large',    // small | medium | large | responsive
            shape: 'pill',     // pill | rect
            color: 'black'      // gold | blue | silver | black
        },

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create

        client: {
            sandbox:    'AVKwzgot1GI1hWkiPP8O58nPEd6F6vmKtWAVVqNMiALZWbk5ddCbbDwak9JewAVclg_W1lkZYpnJgii5',
            production: '<insert production client id>'
        },

        payment: function(data, actions) {
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: grad_total, currency: 'USD' }
                        }
                    ]
                }
            });
        },

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
            	console.log($("#address").val() + ", " + $("#city").val() + ", " + $("#state").val() + " " + $("#zip").val());

            	var order_summary_post = {
            		"summary": order_summary,
            		"total": grad_total,
            		"name": $("#firstname").val(),
            		"address": $("#address").val() + ", " + $("#city").val() + ", " + $("#state").val() + " " + $("#zip").val(),
            		"phone": $("#phone").val()
            	}
            	order_summary_post = JSON.stringify(order_summary_post);

				$.ajax({
					url: 'save_order.php',
					data: {myData: order_summary_post},
					type: 'POST',
					success: function(response) {
						console.log("Saved Order");
					}
				});		

				$("#simpleInfo-title").html("<h4>Mesage from Malibu Grill</h4>")
				$("#simpleInfo-body").html("<p>Payment Complete!</p>")
				$("#simpleInfo").modal();
				$("#close_modal").click(function() {
	                window.location = "index.html";
				});
            });
        }

    }, '#paypal-button-container');

});