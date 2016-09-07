var proApp = angular.module("proApp",[]);
var portfolio = portfolio || {};
portfolio = {
    //Navigate Menu scroll
    onScroll :function(event){
        var scrollPos = $(document).scrollTop();
        $('#myNavbar a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#myNavbar ul li').removeClass("active");
                currLink.parent('li').addClass("active");
            }
        });
    },
    dealMenuClick:function(){
        $(document).on("scroll", portfolio.onScroll);
        //smoothscroll
        $('#myNavbar a[href^="#"]').on('click', function (e) {
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
                $(document).on("scroll", portfolio.onScroll);
            });
        });
    },
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
    // Hobby page
    updateActiveNav:function(){
        var liList = $(".hobby-nav li");
        var liLen = liList.length;
        var type = "";
        $(".hobby-nav li").click(function(){
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
    doWow:function(){
        new WOW({
            offset:100
        }).init();
    },
    onReady: function(){
        portfolio.updateActiveNav();
        portfolio.dealCarousel();
        portfolio.updateMenu();
        portfolio.dealMenuClick();
        portfolio.doWow();
    }

}
$(portfolio.onReady);