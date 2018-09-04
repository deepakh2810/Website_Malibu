(function($) {
	"use strict"
	var order_summary = [];
	var menu_items;

	$.ajax(

        {
            url : 'load_menu_item.php',
            dataType: 'json',
            success: function(result) {
                menu_items = result;
                console.log(menu_items);
                displayItems('lunch');
            } 
        }
	);
	

	//displayItems('lunch');

    /*
        display each subcategory for a given category.

    */
    
   function displayItems(category) {

	var categoryItems = menu_items[category]; // { }
	console.log(menu_items);
	var subCategory_names = Object.keys(categoryItems); // 
	var subCatMenu = `<div id=` +`"` + category +`"` + `class="tab-pane fade in active">
		<div class="col-md-2">
			<div class="sidebar-nav">
				<div class="navbar navbar-default" role="navigation">
					<div class="navbar-collapse collapse sidebar-navbar-collapse">
						<ul class="nav navbar-nav">`

	for(var item in subCategory_names){
		subCatMenu += '<li id = "item' + item + '" ' + 'class = "active">' 
						+ '<a id = "sub-cat' + item + '" class = "dummy"> ' + 
						subCategory_names[item]  + '</a></li>';
	}

	subCatMenu += '</ul></div><!--/.nav-collapse --></div></div></div>';
	var subCatItems = getMenuItems(category, subCategory_names[0]); // default: select first category
	$('div#menu-content').prepend(subCatMenu + subCatItems);   
   
}

/*
	returns the mark-up containing menu items
	of all given a category and subCategory

*/

function getMenuItems(category, subCategory) {

	console.log(category, subCategory);
	var active_menu = menu_items[category.trim()][subCategory.trim()]; //
	var menu_item = '<div class="col-md-8 dish-content">';

	console.log(active_menu);
	for(var item in active_menu) {
		if(active_menu.hasOwnProperty(item)) {

			var dish = `<div class="single-dish">
				<div class="single-dish-heading">
					<h4 class="name">` + active_menu[item].name + `</h4>
						<h4 class="price">` + active_menu[item].cost + `
																		
					</h4>
				</div>
				<p>` + active_menu[item].description + `</p>
			</div>`

			menu_item += dish;

		} 
	}

	menu_item += '</div>';

	return menu_item;

}
	// Preloader
	$(window).on('load', function() {
		$("#preloader").delay(600).fadeOut();
	});
	
	// Mobile Toggle Btn
	$('.navbar-toggle').on('click',function(){
		$('#header').toggleClass('nav-collapse');
	});
	
	// Fixed Nav
	$(window).on('scroll', function() {
		var wScroll = $(this).scrollTop();
		wScroll > $('.banner-area').height() ? $('#header').addClass('fixed') : $('#header').removeClass('fixed');
	});
	
	// Banner Area Height
	function bannerHeight () {
		$('.banner-area').css({'paddingTop': $('#header').height() + 30});
	}
	$(window).on('resize', function() {
		bannerHeight();
	});
	bannerHeight();
	
	// Galery Slider
	$('#galery').owlCarousel({
		items:2,
		loop:true,
		margin:0,
		dots : false,
		nav: true,
		navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		autoplay : true,
		responsive:{
			0: {
				items:1
			},
			992:{
				items:2
			}
		}
	});

	$("#lunch").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('lunch calling');
        displayItems('lunch');
    });

    $("#dinner").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('dinner calling');
        displayItems('dinner');
    });

    $("#drinks").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('drinks calling');
        displayItems('drinks');

    });

    $("#weekends").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('weekends calling');
        displayItems('weekends');
    });

    $(".container").on('click', '.dummy', function() {
        var subCategory = $(this).text();
		//var category = $('.tab-pane').attr('id');
		var category = $(this).closest('.tab-pane').attr('id');
        var subCatItems= getMenuItems(category, subCategory);
        console.log(subCatItems);
        $('div.dish-content').remove();
        var $element = 'div#'+ category + ' > div:nth-child(1)';
        $($element).after(subCatItems);
    });


	
})(jQuery);

$("#reply").ready(function(){
    var ratings = document.getElementsByClassName('rating');
    console.log("Loaded reply content");
    for (var i = 0; i < ratings.length; i++) {
        var r = new SimpleStarRating(ratings[i]);

        ratings[i].addEventListener('rate', function(e) {
            console.log('Rating: ' + e.detail);
            $("#user_comment_rating").val(e.detail);
        });
    }
});

