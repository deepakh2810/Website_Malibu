$(document).ready(function(){
	if (localStorage.getItem('user_id'))
	{
		console.log("Valid User ID");
		$("#login-register").html("My Profile");
		$("#login-register").removeAttr("data-toggle");
		$("#login-register").click(function() {
			window.location = "profile.html";
		});
	}
	else
	{
		$("#login-register").html("Login/Register");
		$("#login-register").attr("data-toggle", "modal");
		console.log("User ID not equal to 1");
	}

	function loginResponse(context)
	{
		var userCredentials = 
		{
			"email": $("#email").val(),
			"pwd": $("#pwd").val()
		}
		userCredentials = JSON.stringify(userCredentials);
		$.ajax({
			url: 'login.php',
			data: {userData: userCredentials},
			dataType: 'json',
			type: 'POST',
			success: function(response) {
				console.log("Login result: " + response.user_id);
				if(response.user_id > 0)
				{
					localStorage.setItem('user_id', response.user_id);
					$("#login-register").removeAttr("data-toggle");
					if (response.first == 'Admin') {
						window.location = 'admin.html';
					} else if(response.first == 'Chef') {
						window.location = 'chef.html';
					} else {
						if (context == "order") {
							window.location = "order.html";
						} else {
							window.location = "index.html";
						}
					}
				}
				else
				{
					localStorage.removeItem('user_id');
					$("#login-register").attr("data-toggle", "modal");
					$("#wrong-credentials").html("Wrong email or password");
					console.log("Error");
				}
				console.log(localStorage.getItem('user_id'));
			}
		});		

	}



	function registerResponse(context)
	{
		console.log("call registerResponse");
		var userCredentials = 
		{
			"name": $("#name").val(),
			"email": $("#newemail").val(),
			"pwd": $("#newpwd").val()
		}
		userCredentials = JSON.stringify(userCredentials);
		$.ajax({
			url: 'register.php',
			data: {userData: userCredentials},
			dataType: 'json',
			type: 'POST',
			success: function(response) {
				console.log("Login result: " + response.user_id);
				if(response.user_id > 0)
				{
					console.log("inside true user_id");
					localStorage.setItem('user_id', response.user_id);
					$("#login-register").removeAttr("data-toggle");
					if (context == "order")
					{
						window.location = "order.html";
					}
					else
					{
					window.location = "index.html";
					}
				}
				else
				{
					localStorage.removeItem('user_id');
					$("#login-register").attr("data-toggle", "modal");
					$("#wrong-registration-credentials").html("User email account exists");
					console.log("Error");
				}
				console.log(localStorage.getItem('user_id'));
			}
		});		

	}


	$("#login-register").click(function() {
		$("#login-modal").modal();

		$("#login-submit").off();
		$("#login-submit").click(function() {
			loginResponse("login");
		});

		$("#registration-submit").click(function() {
			registerResponse("login");
		});
	});

	$("#order").click(function() {
		if (localStorage.getItem("user_id"))
		{
			window.location = "order.html";
		}
		else
		{
			$("#login-modal").modal();

			$("#login-submit").off();
			$("#login-submit").click(function() {
				loginResponse("order");
			});
			$("#registration-submit").click(function() {
				registerResponse("login");
			});
		}
	});

});