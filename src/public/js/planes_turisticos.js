/************************************************
 *  JS - TURISTIC PLAN REQUEST MODAL EMAIL SCRIPT *
 **************************************************/
var plan_selected;

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
          sweetalertX(data.success, data.url);
        } else {
          sweetalertX(data.success, data.url);
        }
      });
  }

  function reloadX(url) {
    window.location.href = url;
  }

  function sweetalertX(status, url) {
    if (status) {
      Swal.fire({
        type: "success",
        title: "Genial...",
        text: "Mensaje Enviado..",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar"
      }).then(result => {
        if (result.value) {
          reloadX(url);
        } else {
          alert(result.value + "XXXA");
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