    //Slider home 1
    var revapi1,
            tpj=jQuery;
                    
    tpj(document).ready(function() {
        if(tpj("#rev_slider_1_1").revolution == undefined){
            revslider_showDoubleJqueryError("#rev_slider_1_1");
        }else{
            revapi1 = tpj("#rev_slider_1_1").show().revolution({
                sliderType:"standard",
                jsFileLocation:"../revolution/js/",
                sliderLayout:"fullwidth",
                dottedOverlay:"none",
                delay:9000,
                navigation: {
                    onHoverStop:"off",
                },
                responsiveLevels:[1240,1024,778,479],
                visibilityLevels:[1240,1024,778,479],
                gridwidth:[1370,1400,1400,1400],
                gridheight:[1000,768,960,960],
                lazyType:"none",
                shadow:0,
                spinner:"spinner0",
                stopLoop:"off",
                stopAfterLoops:-1,
                stopAtSlide:-1,
                shuffle:"off",
                autoHeight:"off",
                disableProgressBar:"on",
                hideThumbsOnMobile:"off",
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                debugMode:false,
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            });
        }
        
    }); /*rev slider*/


    //Slider home 2
    var revapi2,
        tpj=jQuery;
                
    tpj(document).ready(function() {
        if(tpj("#rev_slider_2_1").revolution == undefined){
            revslider_showDoubleJqueryError("#rev_slider_2_1");
        }else{
            revapi2 = tpj("#rev_slider_2_1").show().revolution({
                sliderType:"standard",
                jsFileLocation:"../revolution/js/",
                sliderLayout:"fullwidth",
                dottedOverlay:"none",
                delay:9000,
                navigation: {
                    onHoverStop:"off",
                },
                responsiveLevels:[1240,1024,778,778],
                visibilityLevels:[1240,1024,778,778],
                gridwidth:[1370,1400,1400,1400],
                gridheight:[1000,768,960,960],
                lazyType:"none",
                shadow:0,
                spinner:"spinner0",
                stopLoop:"off",
                stopAfterLoops:-1,
                stopAtSlide:-1,
                shuffle:"off",
                autoHeight:"off",
                disableProgressBar:"on",
                hideThumbsOnMobile:"off",
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                debugMode:false,
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            });
        }
        
    }); /*ready*/