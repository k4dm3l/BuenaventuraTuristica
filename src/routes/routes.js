/*****************************
 * Requerimientos de Modulos *
 * ***************************/
const express = require("express");
const sendMail = require("../utilities/mail");
const sendMailP = require("../utilities/mailRequestPlan");
const request = require("request");

/*******************
 * JSON Data Files *
 * *****************/
const asociados = require("../utilities/json/asociados");
const agenda_turistica = require("../utilities/json/agenda_turistica");
const planes_turisticos = require("../utilities/json/planes_turisticos");

/*********************************
 * REST API's - (Rutas Servidor) *
 * *******************************/
const router = express.Router();

/********************************
 *        GET REQUESTS          *
*********************************/

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

/**************************************
 * GET
 * Route /agenda-cultura = agenda.ejs *
 **************************************/
router.get("/agenda-cultural", (req, res) => {
  res.render("es/agenda.ejs", 
  {
    title: "BuenaventuraTuristica",
    header_title: "Conoce nuestra agenda!",
    agenda_turistica
  });
});

/****************************************************
 * GET
 * Route /planes-tursiticos = planes_turisticos.ejs *
 ****************************************************/
router.get("/planes-turisticos", (req, res) => {
  res.render("es/planes_turisticos.ejs",
  {
    title: "BuenaventuraTuristica",
    header_title: "Conoce nuestros planes!",
    planes_turisticos
  });
});

/********************************
 *        POST REQUESTS         *
*********************************/

/*********************************
 * POST
 * Route / = Envio Contactenos *
 **********************************/
router.post('/submit', (req, res) => {
  const { name, email, text, captcha } = req.body;
  const url_p = "https://www.buenaventura.com";

  if(captcha === undefined || captcha === "" || captcha === null){
    return res.json({
      success: false,
      url: url_p
    });
  } else {
    //API Secret Key
    const secretKey = process.env.API_KEY_CAPTCHA;
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
            return res.json({ 
              success: true, 
              url: url_p
            });
          }
        });
      }
    });
  }
});

/********************************************
 * POST
 * Route / = Envio Solicitud Plan Turistico *
 ****************************************/

 router.post("/plan-request", (req, res) => {
  const { name, email, plan_selected } = req.body;
  const url_p = "https://www.buenaventura.com";
  
  if(email === undefined || email === "" || email === null) {
    return res.json({
      success: false,
      url: url_p
    });
  } else {
    sendMailP(name, email, plan_selected, (err, data) => {
      if(err){
        return res.json({ 
          success: false, 
          url: url_p
        });
      } else {
        return res.json({ 
          success: true, 
          url: url_p
        });
      }
    });
  }
});

/*******************************************
 * Export Archivo Rutas - (Rutas Servidor) *
 * *****************************************/
module.exports = router;
