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
