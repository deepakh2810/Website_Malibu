$(document).ready(function() {
    "use strict"

    var menu_items;
    var updateCategory; // try to remove this dont use global 
    var updateSubCategory; // try to remove this dont use global

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

    $("#signout").click(function () {
        localStorage.removeItem('user_id');
        window.location = "index.html";
    });

        //displayItems('lunch');

    /*
        display each subcategory for a given category.

    */
    
   function displayItems(category) {

    var categoryItems = menu_items[category]; // { }
    console.log(menu_items);
    var count = 0;
    var subCategory_names = Object.keys(categoryItems); // 
    var subCatMenu = `<div id=` +`"` + category +`"` + `class="tab-pane fade in active category">
        <div class="col-md-2">
            <div class="sidebar-nav">
                <div class="navbar navbar-default" role="navigation">
                    <div class="navbar-collapse collapse sidebar-navbar-collapse">
                        <ul class="nav navbar-nav">`

    for(var item in subCategory_names){ 
        if(count == 0){
            subCatMenu += '<li id = "item' + item + '" ' + 'class = "active">' 
                        + '<a id = "sub-cat' + item + '" class = "dummy"> ' + 
                        subCategory_names[item]  + '</a></li>';
        }
        else {
            subCatMenu += '<li id = "item' + item + '" ' + '>' 
                        + '<a id = "sub-cat' + item + '" class = "dummy"> ' + 
                        subCategory_names[item]  + '</a></li>';

        }
        count ++;
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
        var id = 0;
        for(var item in active_menu) {
            if(active_menu.hasOwnProperty(item)) {
            
                var dish = `<div id="item` + id + '" ' + `class="single-dish">
                    <div class="single-dish-heading">
                        <h4 class="name">` + active_menu[item].name + `</h4>
                            <h4 class="price">` + active_menu[item].cost + `
                                <a class="fa fa-remove removeitem"></a>
                                <a class="fa fa-pencil-square-o edititem"></a>										
                            </h4>
                    </div>
                    <p>` + active_menu[item].description + `</p>
                </div>`
            
                menu_item += dish;
                id +=1;
            
            } 
        }
    
        menu_item += '</div>';
    
        return menu_item;
    
    }

    function removeItem(itemName, subCategory, category, id) {
        var data = {'cmd': 'delete','item': itemName, 'subCategory': subCategory, 'category': category};
        // console.log(category,subCategory)
        //console.log(menu_items[category][subCategory.trim()])
        // var sendData = 
        var dataString = JSON.stringify(data);
        $.post('update.php', {request_data: dataString}, function(response) {
            // do something here with the returnedDate
            if(response === 'OK') {
                console.log('removing item',menu_items[category][subCategory]);
                for(var item in menu_items[category][subCategory]){
                    var cur_item = menu_items[category][subCategory][item];
                    console.log(cur_item['name'],itemName);
                    if(cur_item['name'] === itemName.trim()){
                        menu_items[category][subCategory].splice(item,1);
                        break;
                    }
                }
                $('div#'+ id ).remove();
            }
            console.log(menu_items);
        })

    }

    function editItem(category, subCategory, itemName, itemDescription, itemPrice) {

        console.log("itemName:",itemName, " description:",itemDescription, " itemPrice:", itemPrice);

        $('#item-title').val(itemName);
        $('#item-description').val(itemDescription);
        $('#item-price').val(itemPrice); 
        
        console.log("editItem category",category);
        updateCategory = category;
        updateSubCategory = subCategory;

        $('#update-modal').modal('show');
    }

    function updateItem(title,description,price) {

        // 3 places to update UI, menu_items and backend
        console.log("updateCategory:",updateCategory," updateSubCategory", updateSubCategory);
        console.log("title:",title," description", description," price:", price);
        var cmd = 2; // 0->nochange 1->update 2->insert

        var items = menu_items[updateCategory][updateSubCategory];
        for(var idx in items) {
            console.log("title",items[idx].name, title);
            if(items[idx].name === title){
                if(items[idx].description === description){
                    if(items[idx].cost !== price){
                        cmd = 1;
                        var data = {
                            'cmd': 'update',
                            'category': updateCategory,
                            'subcategory': updateSubCategory,
                            'name': title,
                            'description': description,
                            'cost': price,
                        };
                        var dataString = JSON.stringify(data)
                        $.post('update.php', {request_data: dataString}, function(response){
                            items[idx].cost = price;
                            $('#item'+idx + '.single-dish').find('.price').html(price 
                                +`<a class="fa fa-remove removeitem"></a>
                                <a class="fa fa-pencil-square-o edititem"></a>`	// hack here should hamdle properly
                            );
                            console.log("changing idx price",idx);
                        });
                        
                    }
                    else {
                        console.log("changing value to 0");
                        cmd = 0;
                    }
                   
                }
                else {
                    console.log(items[idx].description, description);
                    cmd = 1;
                    var data = {
                        'cmd': 'update',
                        'category': updateCategory,
                        'subcategory': updateSubCategory,
                        'name': title,
                        'description': description,
                        'cost': price,
                    };
                    var dataString = JSON.stringify(data)
                    $.post('update.php', {request_data: dataString}, function(response){
                        items[idx].description = description;
                        $('#item'+idx + '.single-dish').find('p').text(description);  
                        console.log("changing idx description ",idx);                                 
                    });    
                }
                break;
            }
    
        }
        console.log("cmd: ", cmd);
        if(cmd == 2) {
            console.log("Pushing new data");
            var data = {
                'cmd': 'insert',
                'category': updateCategory,
                'subcategory': updateSubCategory,
                'name': title,
                'description': description,
                'cost': price,
            };
            var dataString = JSON.stringify(data);
            $.post('update.php', {request_data: dataString}, function(response){

                items.push(
                    {
                        'name': title,
                        'description': description,
                        'cost': price,
                    }
                );

                var dish = `<div id="item` + (items.length -1) + '" ' + `class="single-dish">
                        <div class="single-dish-heading">
                            <h4 class="name">` + title + `</h4>
                                <h4 class="price">` + price + `
                                    <a class="fa fa-remove removeitem"></a>
                                    <a class="fa fa-pencil-square-o edititem"></a>										
                                </h4>
                        </div>
                        <p>` + description + `</p>
                    </div>`
                $('div.dish-content').append(dish);
            });
            
        }
 
        console.log(menu_items);

    }
    function addNewItem(){
        var newItemform = `<div class =" add-new-item tab-pane fade in active" >
            <h3 class="title">Add new Item</h3>
            <input class="input" placeholder="Category" type="text" id="category"></br>
            <input class="input" placeholder="SubCategory" type="text" id="subcategory"></br>
            <input class="input" placeholder="Name" type="text" id="name"></br>
            <input class="input" placeholder="Description" type="text" id="description"></br>
            <input class="input" placeholder="Price" type="text" id="cost"></br>
            <button class="main-button" id="submit-new-item" style="margin-top:20px;">Submit</button></br>
        </div>`;
        
        $('div#menu-content').prepend(newItemform);

    }
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

    $("#add-new-item").click( function() {
        $('#menu-content div:first').remove();
        $('#menu-content div:nth-child(2)').remove();
        console.log('weekends calling');
        //displayItems('weekends');
        addNewItem();
    });

    $(".container").on('click', '.dummy', function() {
        var subCategory = $(this).text();
        $('.navbar-nav li.active').removeClass('active');
        $(this).parent().addClass('active');
        var category = $('.tab-pane.category').attr('id');
        var subCatItems= getMenuItems(category, subCategory);
        console.log(subCatItems);
        $('div.dish-content').remove();
        var $element = 'div#'+ category + ' > div:nth-child(1)';
        $($element).after(subCatItems);
    });

    $(".container").on('click', '.removeitem', function(){

        var item = $(this).closest('h4').prev().html().trim();
        console.log();
        var subCategory = $('.navbar-nav li.active').children().text();//$('.dummy').text().trim();
        var category = $('.tab-pane.category').attr('id').trim();
        var id = $(this).closest('div.single-dish').attr('id').trim();
        console.log("removeitem calling","item",item, "Sub cat",subCategory, "Cat",category);
        removeItem(item,subCategory.trim(),category.trim(), id);


    });

    $(".container").on('click', '.edititem', function(){

        var item = $(this).closest('h4').prev().html().trim();
        var price = $(this).closest('h4.price').text();
        var description = $(this).closest('.single-dish').children('p').text();
        console.log(description);
        var subCategory = $('.navbar-nav li.active').children().text().trim();//$('.dummy').text().trim();
        var category = $('.tab-pane.category').attr('id').trim();
        //console.log("removeitem calling","item",item, "Sub cat",subCategory, "Cat",category);
        // removeItem(item,subCategory.trim(),category.trim(), id);
        editItem(category, subCategory,item,description.trim(),price.trim())



    });

    $('#update-submit').click(function() {
        var title = $('#item-title').val().trim();
        var description = $('#item-description').val().trim();
        var price = $('#item-price').val().trim();
        
        console.log("update price:", price);
        $('#update-modal').modal('hide');

        updateItem(title,description,price);

    
    });

    $(".container").on('click', '#submit-new-item', function(){
        console.log("Clicked add_comment");
        var category = $("#category").val();
        var subCategory = $("#subcategory").val();
        var name = $("#name").val();
        var description = $("#description").val();
        var cost = $("#cost").val();
		var dataString = 
		{
            "cmd": "insert",
			"category": $("#category").val(),
			"subcategory": $("#subcategory").val(),
			"name": $("#name").val(),
            "description": $("#description").val(),
			"cost": $("#cost").val(),            
		}

		dataString = JSON.stringify(dataString);
		$.ajax({
			url: 'update.php',
			data: {request_data: dataString},
			type: 'POST',
			success: function(response) {

                if(response === 'OK' ){
                    var newData = {'name':name, 'description':description, 'cost': cost};
                    console.log(category, subCategory);
                    if(menu_items[category][subCategory]) 
                        menu_items[category][subCategory].push(newData);
                    else{
                        menu_items[category][subCategory] = [];
                        menu_items[category][subCategory].push(newData);
                    }
                    //var subCatItems= getMenuItems(category, subCategory);
                    //console.log(subCatItems);
                    $('div.add-new-item').remove();
                    $('a#add-new-item').parent().removeClass('active');
                    $('a#' + category).parent().addClass('active');
                    //var $element = 'div#'+ category + ' > div:nth-child(1)';
                    //$($element).after(subCatItems);
                    displayItems(category);
                    var subCatItems= getMenuItems(category, subCategory);
                    $('div.dish-content').remove();
                    var $element = 'div#'+ category + ' > div:nth-child(1)';
                    $($element).after(subCatItems);
                    console.log("removing element");
                    $('.navbar-nav li.active').removeClass('active');
                    console.log(menu_items[category]);
                    var count = 0;
                    for(var key in menu_items[category]){
                            if(key == subCategory){
                                break;
                            }
                            count++;
                    }
                    // var elementPos = menu_items[category].map(function(x) {return x.name; }).indexOf(subCategory);
                    console.log(count);
                    // console.log($('a#sub-cat'+count));
                    $('.navbar-nav li#item'+count).addClass('active');
                }
			}
		});		
	});

});

(function($) {
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
})(jQuery);
