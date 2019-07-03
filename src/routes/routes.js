/*****************************
 * Requerimientos de Modulos *
 * ***************************/
const express = require("express");
const sendMail = require("../utilities/mail");
const request = require("request");

/*******************
 * JSON Data Files *
 * *****************/
const asociados = require("../utilities/json/asociados");
const agenda_turistica = require("../utilities/json/agenda_turistica");

const router = express.Router();
/*********************************
 * REST API's - (Rutas Servidor) *
 * *******************************/

/*********************************
 * GET
 * Route / = index.ejs *
 **********************************/
router.get("/", (req, res) => {
  res.render("es/index.ejs", 
  { 
    title: "BuenaventuraTuristica",
    asociados 
  });
});

/*********************************
 * GET
 * Route / = agenda.ejs *
 **********************************/
router.get("/agenda-cultural", (req, res) => {
  res.render("es/agenda.ejs", 
  {
    title: "BuenaventuraTuristica",
    agenda_turistica
  });
});

/*********************************
 * POST
 * Route / = Envio Contactenos *
 **********************************/
router.post('/submit', (req, res) => {
  const { name, email, text, captcha } = req.body;
  const url_p = "http://localhost:4000";//URL Debe cambiar por el dominio

  if(captcha === undefined || captcha === "" || captcha === null){
    return res.json({
      success: false,
      url: url_p
    });
  } else {
    //API Secret Key
    const secretKey = process.env.API_KEY;
    //URL de verificacion
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    request(verificationURL, (error, response, body) => {
      if(body.success !== undefined && !body.success){
        return res.json({
          success: false,
          url: url_p
        });
      } else {
        sendMail(name, email, text, (err, data) => {
          if(err){
            res.status(500).redirect('/');
          } else {
            return res.json({ success: true, url: url_p});
          }
        });
      }
    });
  }
});

/*******************************************
 * Export Archivo Rutas - (Rutas Servidor) *
 * *****************************************/
module.exports = router;
