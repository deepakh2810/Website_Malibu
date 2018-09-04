$(document).ready(function() {
    
    var order_summary = [];
    var grand_total = 0
    var order_count = 0;
    

    // each object has three fields title, count and total cost.
    /* example 

        order_summary = [
             {
                title : '', 
                count: 0,
                cost: 0,
                id: 0,
            },
        ]
    */

    /*
        {
            breakfast: {
                sub-cat1 : [
                    {
                        name: ,
                        descp: ,
                        cost: ,
                    },
                    {
                        name: ,
                        descp: ,
                        cost: ,
                    },
                    {
                        name: ,
                        descp: ,
                        cost: ,
                    }
                ],
                sub-cat2 : [
                    name: ,
                    descp: ,
                    cost: ,
                ],
                sub-cat1 : [
                    name: ,
                    descp: ,
                    cost: ,
                ],
                sub-cat1 : [
                    name: ,
                    descp: ,
                    cost: ,
                ]
            },

            lunch: {
                sub-cat1 : [
                    name: ,
                    descp: ,
                    cost: ,
                ],
                sub-cat1 : [
                    name: ,
                    descp: ,
                    cost: ,
                ],
                sub-cat1 : [
                    name: ,
                    descp: ,
                    cost: ,
                ]
            },

            dinner: {
                sub-cat1 : [
                    name: ,
                    descp: ,
                    cost: ,
                ]
            },

        }

        
    */
        /********* sample menuitems *************** */
        menu_items = {
            'lunch': {
                'sub-cat1' : [
                                {
                                    name: 'Test String1',
                                    descp: 'Test String1',
                                    cost: '$25',
                                },
                                {
                                    name: 'Test String2',
                                    descp: 'Test String2',
                                    cost: '$25',
                                },
                                {
                                    name: 'Test String3',
                                    descp: 'Test String3',
                                    cost: '$25',
                                }
                            ],
                'sub-cat2' : [
                                {
                                    name: 'adasdasdaddadadsadsad',
                                    descp: 'fasffgdfgdfhfghfghfh',
                                    cost: '$25',
                                }
                            ]    
            
            },
            'dinner': {
                'sub-cat1' : [
                                {
                                    name: 'Test String4',
                                    descp: 'Test String1',
                                    cost: '$25',
                                },
                                {
                                    name: 'Test String5',
                                    descp: 'Test String2',
                                    cost: '$25',
                                },
                                {
                                    name: 'Test String6',
                                    descp: 'Test String3',
                                    cost: '$25',
                                }
                            ],
                'sub-cat2' : [
                                {
                                    name: 'adasdasdaddadadsadsad',
                                    descp: 'fasffgdfgdfhfghfghfh',
                                    cost: '$25',
                                }
                            ]    
            
            },
            'drinks': {
                'sub-cat1' : [
                                {
                                    name: 'Test String1',
                                    descp: 'Test String1',
                                    cost: '$25',
                                },
                                {
                                    name: 'Test String2',
                                    descp: 'Test String2',
                                    cost: '$25',
                                },
                                {
                                    name: 'Test String3',
                                    descp: 'Test String3',
                                    cost: '$25',
                                }
                            ],
                'sub-cat2' : [
                                {
                                    name: 'adasdasdaddadadsadsad',
                                    descp: 'fasffgdfgdfhfghfghfh',
                                    cost: '$25',
                                }
                            ]    
            
            }
        }    

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
        var menu_item = '<div class="col-md-5 dish-content">';

        console.log(active_menu);
        for(var item in active_menu) {
            if(active_menu.hasOwnProperty(item)) {

                dish = `<div class="single-dish">
                    <div class="single-dish-heading">
                        <h4 class="name">` + active_menu[item].name + `</h4>
                            <h4 class="price">` + active_menu[item].cost + `
                                <a class="fa fa-plus-circle addItem"></a>											
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

        
    function addItem(itemTitle, self = '') {

        if (order_summary.filter(e => e.title === itemTitle).length > 0) {
            //console.log('vendors contains the element were looking for '); 

            var index = order_summary.findIndex((obj => obj.title == itemTitle));
            var item = order_summary[index] 
            var id = item.id;

            //update count
            item.count += 1;
            element = 'li#order-list-id' + id;
            console.log("element",$(element).children('span#count'));
            $(element).children('span#count').text(item.count);

            //update cost
            var total_cost = parseInt(item.cost) * parseInt(item.count);
            $(element).children('span#price').text('$' + total_cost);
            
            grand_total += parseInt(item.cost);
            console.log(grand_total);
            console.log('update grandtotal');            
            $('div#grand-total').children().text('$' + grand_total);
            
        }
        else{

            console.log('key not Found ' + itemTitle);
            
            var newItem = {};
            newItem.title = itemTitle;
            newItem.count = 1;
            newItem.id = order_count;

            var amount = self.parent().text()
            var cost = amount.match(/\d+/)[0]

            newItem.cost = cost;
            grand_total += parseInt(cost);
            

            if($('ul#order-summary li').length == 0){

                console.log("Adding grandtotal");
                var $span = $('<span style = "float: right;"> $' + grand_total + '</span>');
                var $div = $('<div id = "grand-total" >Total Price: </div>');
                $div.append($span);
                console.log($div.html());
                $('ul#order-summary').after($div);
                console.log("setting hidden to false");                
                $('#order-card').attr('hidden', false);

            }

            order_summary.push(newItem);
            
            //deleteButton
            var deleteButton = document.createElement('a');
            deleteButton.setAttribute('id', 'deleteItem');
            deleteButton.setAttribute('class', 'fa fa-minus-circle');            

            //addButton
            var addButton = document.createElement('a');
            addButton.setAttribute('id', 'addItem-summary');            
            addButton.setAttribute('class', 'fa fa-plus-circle ');

            //count 
            var count =document.createElement('span');
            count.setAttribute('id', 'count');
            count.setAttribute('class', 'countItem');
            count.innerHTML = newItem.count;
        
            //totalprice
            var total_cost = parseInt(cost) * 1;
            var price_element = document.createElement('span');
            price_element.setAttribute('id', 'price');
            price_element.setAttribute('style', 'float: right; color: #f36500;');
            price_element.setAttribute('class', 'totalPriceItem');
            price_element.innerHTML = '$' + total_cost;


            var liItem =document.createElement('li');
            var id = 'order-list-id' + order_count;
            liItem.setAttribute('id', id);
            liItem.className = 'list-group-item';
            itemTitle = '<span class= "item-title">' + itemTitle + '</span>';
            liItem.innerHTML = itemTitle;
            liItem.append(addButton, count, deleteButton, price_element)
            console.log(liItem);
            $('ul#order-summary').append(liItem);

            order_count += 1;
            console.log('update grandtotal');
            $('div#grand-total').children().text( '$' + grand_total);
            
        
        }
       
        //when to add ->atleast one element
        //when to update ->  
        //when to remove -> there are no elements in the order_summary    
    }

    function deleteItem(itemTitle) {

        console.log("Deleteing Item");
        var index = order_summary.findIndex((obj => obj.title == itemTitle));
        var item = order_summary[index]
        var item_id = item.id;

        var element = '#order-list-id' + item_id;
        item.count -= 1;
        grand_total -= item.cost;

        $('div#grand-total').children().text('$' + grand_total);

        if(item.count == 0) {
            order_summary.splice(index, 1);
            $('ul#order-summary ' + element).remove();
            if($('ul#order-summary li').length == 0) {
                grand_total = 0;
                order_count = 0;
                $('div#grand-total').remove();
                console.log("setting hidden to true");
                $('#order-card').attr('hidden', true);
            }
            return;
        }
        console.log("Order-summary:",order_summary);
        console.log("element", element);
        $(element).children('span#count').text(item.count);

        //update cost
        var total_cost = parseInt(item.cost) * parseInt(item.count);
        $(element).children('span#price').text('$' + total_cost);
                
    }

    $(".container").on('click', '.addItem', function() {
        console.log("add summary");
        var itemTitle = $(this).parent().prev().text();
        console.log("Debug", $(this).parent().prev().text());
        addItem(itemTitle, $(this));
    });


    $(".container").on('click', '#addItem-summary', function() {
        console.log("add summary");
        var itemTitle = $(this).parent().find('span.item-title').html();
        console.log("itemTitle",itemTitle);
        addItem(itemTitle);
    });

    $(".container").on('click', '#deleteItem',function() {

        var itemTitle = $(this).parent().find('span').html();
        console.log("itemTitle", itemTitle);
        deleteItem(itemTitle);
        
    });

    $(".container").on('click', '#clear-cart', function() {

        console.log('clearing cart');
        grand_total = 0;
        order_count = 0;
        $('div#grand-total').remove();
        $('ul#order-summary').empty();
        order_summary = [];
        console.log("setting hidden to true");
        $('#order-card').attr('hidden', true);
    });

    $(".container").on('click', '#checkout', function() {
        localStorage.setItem('order_summary', JSON.stringify(order_summary));
        window.location.href = 'checkout.html';
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
        var category = $('.tab-pane').attr('id');
        var subCatItems= getMenuItems(category, subCategory);
        console.log(subCatItems);
        $('div.dish-content').remove();
        $element = 'div#'+ category + ' > div:nth-child(1)';
        $($element).after(subCatItems);
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
