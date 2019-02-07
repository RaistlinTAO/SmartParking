$(document).ready(function() { 

            //Carousel home 1
            $("#carousel1").owlCarousel({
                dots:false, 
                loop:true, 
                margin:0,  
                nav:false, 
                autoplay:true,
                autoplayTimeout:2000,
                autoplayHoverPause:true, 
                autoHeight:false,
                responsive:{
                    0:{
                        items:1
                    },
                    1000:{
                        items:1
                    }
                }
            }); //carousel1

            $("#carousel2").owlCarousel({  
                dots:false, 
                loop:true, 
                margin:30, 
                nav:true,
                navText : ['<i class="fa fa-chevron-left" aria-hidden="true"></i>','<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
                autoplay:true,
                autoplayTimeout:1000,
                autoplayHoverPause:true, 
                autoHeight:true,
                responsive:{
                    0:{
                        items:1 
                    },
                    1000:{
                        items:3
                    },
                    1500:{
                        items:5
                    }
                }
            }); //carousel2


            //Carousel home 2
            $("#carousel3").owlCarousel({
                dots:false, 
                loop:true, 
                margin:0,  
                nav:false, 
                autoplay:true,
                autoplayTimeout:2000,
                autoplayHoverPause:true, 
                autoHeight:false,
                responsive:{
                    0:{
                        items:1
                    },
                    1000:{
                        items:1
                    }
                }
            }); //carousel3
        });  