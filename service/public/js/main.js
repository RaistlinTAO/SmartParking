/**
  * isMobile
  * responsiveMenu
  * headerFixed
  * flatTeam
  * googleMap
  * onepage_nav
  * swClick
  * goTop
  * retinaLogos
  * removePreloader
*/

;(function($) {

    
 
    var isMobile = {
         Android: function() {
             return navigator.userAgent.match(/Android/i);
         },
         BlackBerry: function() {
             return navigator.userAgent.match(/BlackBerry/i);
         },
         iOS: function() {
             return navigator.userAgent.match(/iPhone|iPad|iPod/i);
         },
         Opera: function() {
             return navigator.userAgent.match(/Opera Mini/i);
         },
         Windows: function() {
             return navigator.userAgent.match(/IEMobile/i);
         },
         any: function() {
             return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
         }
    };
 
    var responsiveMenu = function() {
         var menuType = 'desktop';
 
         $(window).on('load resize', function() {
             var currMenuType = 'desktop';
 
             if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                 currMenuType = 'mobile';
             }
 
             if ( currMenuType !== menuType ) {
                 menuType = currMenuType;
 
                 if ( currMenuType === 'mobile' ) {
                     var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                     var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');
 
                     $('#header').after($mobileMenu);
                     hasChildMenu.children('ul').hide();
                     hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                     $('.btn-menu').removeClass('active');
                 } else {
                     var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');
 
                     $desktopMenu.find('.submenu').removeAttr('style');
                    $('#header').find('.nav-wrap').append($desktopMenu);
                    $('.btn-submenu').remove();
                 }
             }
         });
 
         $('.btn-menu').on('click', function() {         
             $('#mainnav-mobi').slideToggle(300);
             $(this).toggleClass('active');
         });
 
         $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
             $(this).toggleClass('active').next('ul').slideToggle(300);
             e.stopImmediatePropagation()
         });
    }
 
    var headerFixed = function() {
         if ( $('body').hasClass('header_sticky') ) {
             var nav = $('.header');
 
             if ( nav.size() != 0 ) {
                 var offsetTop = $('.header').offset().top,
                     headerHeight = $('.header').height(),
                     injectSpace = $('<div />', { height: headerHeight }).insertAfter(nav);   
                     injectSpace.hide();                 
 
                 $(window).on('load scroll', function(){
                     if ( $(window).scrollTop() > offsetTop + 120 ) {
                         $('.header').addClass('downscrolled');
                         injectSpace.show();
                     } else {
                         $('.header').removeClass('header-small downscrolled');
                         injectSpace.hide();
                     }
 
                     if ( $(window).scrollTop() > 500 ) {
                         $('.header').addClass('header-small upscrolled');
                     } else {
                         $('.header').removeClass('upscrolled');
                     }
                 })
             }
         }     
    };   

    var googleMap = function () {
        // gmap default
        if ($().gmap3) {
            var data = JSON.parse('[{"address":"Westwell Leacon, Ashford, VÆ°Æ¡ng Quá»‘c Anh","content":""}]');
            $("#themesflat-map").gmap3({
                    map: {
                        options: {
                            zoom: 10,
                            center: [51.1946026,0.8140602,14.5],
                            mapTypeId: 'rano',
                            mapTypeControlOptions: {
                                mapTypeIds: ['rano', google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID]
                            },
                            scrollwheel: true
                        },
                    },
                });
            // json loop
            $.each(data, function (key, val) {
                $('#themesflat-map').gmap3({
                    marker: {
                        values: [{
                            address: val.address,
                            options: {
                                icon: "./images/icon-map.png"
                            }
                            
                            }]
                    },
                    styledmaptype: {
                        id: "rano",
                        options: {
                            name: "rano"
                        },
                        styles: [
                            {
                                "featureType": "administrative",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": "-100"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "landscape",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 65
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": "50"
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": "-100"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "lightness": "30"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "lightness": "40"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "all",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            
                            {
                                "featureType": "water",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "lightness": -25
                                    },
                                    {
                                        "saturation": -100
                                    }
                                ]
                            }
                        ]
                    }
                });
            });

        }
        
    };  
 
    var onepage_nav = function () {
         $('.onepage .mainnav > ul > li > a').on('click',function() {     
             console.log('has click');      
             var anchor = $(this).attr('href').split('#')[1];
             var largeScreen = matchMedia('only screen and (min-width: 992px)').matches;
             var headerHeight = 0;
             headerHeight = $('.header').height();
             if ( anchor ) {
                 if ( $('#'+anchor).length > 0 ) {
                    if ( $('.upscrolled').length > 0 && largeScreen ) {
                         headerHeight = headerHeight;
                    } else {
                         headerHeight = 0;
                    }                   
                    var target = $('#'+anchor).offset().top - headerHeight;
                    $('html,body').animate({scrollTop: target}, 1000, 'easeInOutExpo');
                 }
             }
             return false;
         })
 
         $('.onepage .mainnav ul > li > a').on( 'click', function() {
             $( this ).addClass('active').parent().siblings().children().removeClass('active');
             $(this).parents('#mainnav-mobi').hide();            
                         
         });
    }  
 
    var responsiveVideo= function() {
         if ( $().fitVids ) {
             $('.container').fitVids();
         }
    };    
     
    var goTop = function() {
         $(window).scroll(function() {
             if ( $(this).scrollTop() > 800 ) {
                 $('.go-top').addClass('show');
             } else {
                 $('.go-top').removeClass('show');
             }
         }); 
 
         $('.go-top').on('click', function() {            
             $("html, body").animate({ scrollTop: 0 }, 1000 , 'easeInOutExpo');
             return false;
         });
    };
  
    var retinaLogos = function() {
       var retina = window.devicePixelRatio > 1 ? true : false;
         if(retina) {
            $('.header .logo').find('img').attr({src:'./images/logo@2x.png',width:'90',height:'24'});   
            $('.logo-ft').find('img').attr({src:'./images/logo-black@2x.png',width:'90',height:'24'});
         }
    };  
 
    var detectViewport = function() {
         $('[data-waypoint-active="yes"]').waypoint(function() {
             $(this).trigger('on-appear');
         }, { offset: '90%', triggerOnce: true });
    };
 
    var removePreloader = function() {        
        $('#preloader').fadeOut('slow',function () {
             $(this).remove();
        });
    };

    var flipster_image = function(){
        var _porfolio_carousel = $('#carousels');
        if( _porfolio_carousel.length === 0 ) {
            return;
        }
        $(_porfolio_carousel).flipster({
            itemContainer: 'ul',
            itemSelector: 'li',
            style: 'carousel', 
            start: 0, 
            enableKeyboard: true, 
            enableMousewheel: false,
            enableTouch: true,
            enableNav: false,
            enableNavButtons: true,
            loop: true, 
        });
    }

    var sw = function() {
        $(".sw-btn").on('click', function(e) { 
            $(".sw-btn").toggleClass('sw-btn-active');
          $(".value-item").removeClass('value-item-hiden');
          $(".value-item").toggleClass('value-item-show value-item-hide');  
        });
    };

    var swClick = function () {
        function activeLayout () {
             
            $(".switcher-container" ).on( "click", "a.sw-light", function() {
                $(this).toggleClass( "active" );
                $('body').addClass('home-boxed');  
                $('body').css({'background': '#f6f6f6' });                
                $('.sw-pattern.pattern').css ({ "top": "100%", "opacity": 1, "display": "block",  "z-index": "10"});
            }).on( "click", "a.sw-dark", function() {
                $('.sw-pattern.pattern').css ({ "top": "98%", "opacity": 0, "display": "none", "z-index": "-1"});
                $(this).removeClass('active').addClass('active');
                $('body').removeClass('home-boxed');
                $('body').css({'background': '#fff' });
                return false;
            })       
        }        

        function activePattern () {
            $('.sw-pattern').on('click', function () {
                $('.sw-pattern.pattern a').removeClass('current');
                $(this).addClass('current');
                $('body').css({'background': 'url("' + $(this).data('image') + '")', 'background-size' : '30px 30px', 'background-repeat': 'repeat' });
                return false
            })
        }

        activeLayout(); 
        activePattern();
    }
 
// Dom Ready
$(function() { 
    if ( matchMedia( 'only screen and (min-width: 992px)' ).matches ) {
        headerFixed();
    }  
    responsiveMenu();     
    onepage_nav();        
    goTop();        
    responsiveVideo();
    retinaLogos(); 
    detectViewport();  
    flipster_image();    
    googleMap(); 
    sw();  
    swClick();
    removePreloader();
});
 
})(jQuery);