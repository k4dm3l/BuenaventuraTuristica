/****************************************
 *  JS - NAVBAR SCROLL SECTION FUNCTION *
 ****************************************/
function scrollFunction(element){
    var scroll = element.id+"-section";
    document.getElementById(scroll).scrollIntoView(true);
}

/******************************
 *  JQUERY - COUNTER UP CARDS *
 ******************************/
jQuery(document).ready(function($) {
    $(".counter").counterUp({
      delay: 5,
      time: 1000
    });
});

/***************************
 *  JQUERY - LOADER SCRIPT *
 ***************************/
$(window).on("load", function() {
    jQuery(".loader-wrapper")
      .delay(1000)
      .fadeOut("slow");
});

/*********************************************************
 *  JQUERY - CHECK WHEN NAVBAR IS IN TOP - ADD CSS CLASS *
 *********************************************************/
$(function() {
    var $window = $(window);
    var $pos = 140;

    $window.scroll(function() {
      if ($window.scrollTop()) {
        $(".nav-link").addClass("scrolldown-text-color");
        $(".navbar").addClass("scrolldown-navbar-background");
      } else {
        $(".nav-link").removeClass("scrolldown-text-color");
        $(".navbar").removeClass("scrolldown-navbar-background");
      }
    });
});

/************************************************
 *  JS - INIT AOS (ANIMATION ON SCROLL LIBRARY) *
 ************************************************/
AOS.init();

/********************************************************
 *  JQUERY - OWL LIBRARY - JQUERY & PARAMETERS FUNCTION *
 ********************************************************/
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
});

/*********************************
 *  JQUERY - GO TOP ARROW SCRIPT *
 *********************************/
$(document).ready(function() {
    $(".go-top").click(function() {
      $("body, html").animate(
        {
          scrollTop: "0px"
        },
        300
      );
    });

    $(window).scroll(function() {
      if ($(this).scrollTop() > 0) {
        $(".go-top").slideDown(300);
      } else {
        $(".go-top").slideUp(300);
      }
    });
});