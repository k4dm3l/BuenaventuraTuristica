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

/***********************************
 *  JS - CONTACT FORM EMAIL SCRIPT *
 ***********************************/
document
    .getElementById("contact_form")
    .addEventListener("submit", sendContact);

  function reload(url) {
    window.location.href = url;
  }

  function sweetalert(status, url) {
    if (status) {
      Swal.fire({
        type: "success",
        title: "Genial...",
        text: "Mensaje Enviado..",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar"
      }).then(result => {
        if (result.value) {
          reload(url);
        } else {
          reload(url);
        }
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Algo Fallo!"
      });
    }
  }

  function sendContact(e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const text = document.querySelector("#text").value;
    const captcha = document.querySelector("#g-recaptcha-response").value;

    const data = {
      name,
      email,
      text,
      captcha
    };

    fetch("submit", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        text: text,
        captcha: captcha
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          sweetalert(data.success, data.url);
        } else {
          sweetalert(data.success, data.url);
          console.log(data.success);
        }
      });
  }

  /************************************************
 *  JS - TURISTIC PLAN REQUEST MODAL EMAIL SCRIPT *
 **************************************************/
let plan_selected;

  function getPlanName(element){
    plan_selected = element.value;
  }
  document.getElementById("plan_form").addEventListener("submit", sendPlanRequest);

  function sendPlanRequest(e) {
    e.preventDefault();

    const name = document.querySelector("#name_X").value;
    const email = document.querySelector("#email_X").value;
    console.log(plan_selected);

    const data = {
      name,
      email,
      plan_selected
    };

    fetch("plan-request", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        plan_selected: plan_selected
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          sweetalert(data.success, data.url);
        } else {
          sweetalert(data.success, data.url);
          console.log(data.success);
        }
      });
  }
/** 
  function reload(url) {
    window.location.href = url;
  }

  function sweetalert(status, url) {
    if (status) {
      Swal.fire({
        type: "success",
        title: "Genial...",
        text: "Mensaje Enviado..",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar"
      }).then(result => {
        if (result.value) {
          reload(url);
        } else {
          reload(url);
        }
      });
    } else {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Algo Fallo!"
      });
    }
  }
*/