var proApp = angular.module("proApp",[]);

var portfolio = portfolio || {};
portfolio = {

    /*
        When scroll webpage:
        1.activate the corresponding menu button
        2.close open navbar
        3.hide person thumb
    */
    onScroll :function(event){
        //activate the corresponding menu button
        var scrollPos = $(document).scrollTop();
        $('#myNavbar a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#myNavbar ul li').removeClass("active");
                currLink.parent('li').addClass("active");
            }
        });
        //close open navbar
        var $navbar = $(".navbar-collapse");
        var _opened = $navbar.hasClass("in");
        if(_opened === true){
            $navbar.collapse('hide');
        }
        //hide thumb
        var homeEle = $('#home');
        if(scrollPos > homeEle.position().top + homeEle.height()){
            $(".brand-img").width(50);
            $(".brand-img").height(50);
        }else{
            $(".brand-img").width(80);
            $(".brand-img").height(80);
        }
    },

    //When click menu button, do scrolling and activate the corresponding menu button
    dealMenuClick:function(){
        $(document).on("scroll", portfolio.onScroll);
        //smoothscroll
        $('a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            $(document).off("scroll");

            $('#myNavbar li').each(function () {
                $(this).removeClass('active');
            })
            $(this).parent('li').addClass('active');

            var target = this.hash;
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top+2
            }, 500, 'swing', function () {
                window.location.hash = target;
                $(document).on("scroll", portfolio.onScroll);
            });
        });
    },

    //When input an address with hash in browser, activate the corresponding menu button
    updateMenu:function(){
        var windowHash = window.location.hash;
        if(windowHash===''){
            $('#myNavbar li').removeClass('active');
            $('#myNavbar li').first().addClass('active');
            return;
        }
        var aHref = '';
        $('#myNavbar a').each(function(){
            aHref = $(this).attr('href');
            if(windowHash === aHref){
                $(this).parent('li').addClass('active');
            }else{
                $(this).parent('li').removeClass('active');
            }
        });
    },

    //Close open collapsed menu when clicking outside
    hideMenu:function() {
        $(document).click(function (event) {
            var clickover = $(event.target);
            var $navbar = $(".navbar-collapse");
            var _opened = $navbar.hasClass("in");
            if (_opened === true && !clickover.hasClass("navbar-toggle")) {
                $navbar.collapse('hide');
            }
        });
    },

    //Complement animate effects with wow.js
    doWow:function(){
        new WOW({
            offset:100
        }).init();
    },

    /************************ Hobby page ***************************/

    //Active the hobby submenu button after click it
    updateActiveNav:function(){
        var liList = $(".hobby-nav li");
        var liLen = liList.length;
        var type = "";
        $(".hobby-nav li").click(function(e){
            for(var i=0;i<liLen;i++){
                $(liList[i]).removeClass('active');
                type = $(liList[i]).attr('data-type');
                $('.'+type+'-con').addClass('hide');
            }
            $(this).addClass('active');
            type = $(this).attr('data-type');
            $('.'+type+'-con').removeClass('hide');
        });
    },

    //Display the images in carousel way
    dealCarousel:function(){
        var travel = $("#travel-carousel");
        var cooking = $("#cooking-carousel");
        var travelLeft = $(".travel-con .prev");
        var travelRight = $(".travel-con .next");
        var cookingLeft= $(".cooking-con .prev");
        var cookingRight = $(".cooking-con .next");
        travel.owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,3],
        });
        travelLeft.click(function(){
            travel.trigger('owl.prev');
        })
        travelRight.click(function(){
            travel.trigger('owl.next');
        })
        cooking.owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [979,3],
        });
        cookingLeft.click(function(){
            cooking.trigger('owl.prev');
        })
        cookingRight.click(function(){
            cooking.trigger('owl.next');
        })
    },

    onReady: function(){
        portfolio.updateActiveNav();
        portfolio.dealCarousel();
        portfolio.updateMenu();
        portfolio.dealMenuClick();
        portfolio.hideMenu();
        portfolio.doWow();
    }
}
$(portfolio.onReady);