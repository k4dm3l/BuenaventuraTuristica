/*****************************
 * Requerimientos de Modulos *
 * ***************************/
const dotenv = require("dotenv");
const express = require("express");
const sendMail = require("../utilities/mail");
const request = require("request");

dotenv.config();
const router = express.Router();
/*********************************
 * REST API's - (Rutas Servidor) *
 * *******************************/

/**GET
 * Route / = index.ejs *
 */
router.get("/", (req, res) => {
  res.render("es/index.ejs", { title: "BuenaventuraTuristica" });
});

/**POST
 * Route / = Envio Contactenos *
 */
router.post('/submit', (req, res) => {
  const { name, email, text, captcha } = req.body;
  const url_p = "http://localhost:4000";

  if(captcha === undefined || captcha === "" || captcha === null){
    return res.json({
      success: false,
      url: url_p
    });
  } else {
    //API Secret Key
    const secretKey = "6LerkacUAAAAAB_A1zDFigEkYqxg6opoBFpA8CMw";
    //URL de verificacion
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${
      req.body.captcha
    }&remoteip=${req.connection.remoteAddress}`;

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
