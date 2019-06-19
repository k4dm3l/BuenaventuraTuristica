const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
    auth: {
        api_key: '6bbd9f6cb74cfcd8169d8251725d9216-16ffd509-6160defe',
        domain: 'sandbox5a2010837ce84773a030fe71706df195.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, text, callback) => {
    const mailOptions = {
        from: 'corpbuntur@gmail.com',
        to: 'corpbuntur@gmail.com',
        subject: `Nuevo mensaje de ${email} - Sitio Web`,
        html: `
        <html>
        <head>
        <link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
/>
        </head>
        <style type="text/css">
body {
  margin: 0;
  padding: 0;
  -webkit-text-size-adjust: 100% !important;
  -ms-text-size-adjust: 100% !important;
  -webkit-font-smoothing: antialiased !important;
}
img {
  border: 0 !important;
  outline: none !important;
}
p {
  Margin: 0px !important;
  Padding: 0px !important;
}
table {
  border-collapse: collapse;
  mso-table-lspace: 0px;
  mso-table-rspace: 0px;
}
td, a, span {
  border-collapse: collapse;
  mso-line-height-rule: exactly;
}
.ExternalClass * {
  line-height: 100%;
}
.em_blue a {text-decoration:none; color:#264780;}
.em_grey a {text-decoration:none; color:#434343;}
.em_white a {text-decoration:none; color:#ffffff;}

@media only screen and (min-width:481px) and (max-width:649px) {
.em_main_table {width: 100% !important;}
.em_wrapper{width: 100% !important;}
.em_hide{display:none !important;}
.em_aside10{padding:0px 10px !important;}
.em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
.em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
.em_aside5{padding:0px 10px !important;}
.em_ptop2 { padding-top:8px !important; }
}
@media only screen and (min-width:375px) and (max-width:480px) {
.em_main_table {width: 100% !important;}
.em_wrapper{width: 100% !important;}
.em_hide{display:none !important;}
.em_aside10{padding:0px 10px !important;}
.em_aside5{padding:0px 8px !important;}
.em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
.em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
.em_font_11 {font-size: 12px !important;}
.em_font_22 {font-size: 22px !important; line-height:25px !important;}
.em_w5 { width:7px !important; }
.em_w150 { width:150px !important; height:auto !important; }
.em_ptop2 { padding-top:8px !important; }
u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}
}
@media only screen and (max-width:374px) {
.em_main_table {width: 100% !important;}
.em_wrapper{width: 100% !important;}
.em_hide{display:none !important;}
.em_aside10{padding:0px 10px !important;}
.em_aside5{padding:0px 8px !important;}
.em_h20{height:20px !important; font-size: 1px!important; line-height: 1px!important;}
.em_h10{height:10px !important; font-size: 1px!important; line-height: 1px!important;}
.em_font_11 {font-size: 11px !important;}
.em_font_22 {font-size: 22px !important; line-height:25px !important;}
.em_w5 { width:5px !important; }
.em_w150 { width:150px !important; height:auto !important; }
.em_ptop2 { padding-top:8px !important; }
u + .em_body .em_full_wrap { width:100% !important; width:100vw !important;}
}
</style>
<body class="em_body" style="margin:0px auto; padding:0px;" bgcolor="#efefef">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" class="em_full_wrap" align="center" bgcolor="#efefef">
    <tr>
      <td align="center" valign="top" class="em_aside5"><table align="center" width="650" border="0" cellspacing="0" cellpadding="0" class="em_main_table" style="width:650px; table-layout:fixed;">
          <tr>
            <td align="center" valign="top" style="padding:0 25px; background-color:#ffffff;" class="em_aside10"><table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
              <tr>
                <td height="45" style="height:45px;" class="em_h20">&nbsp;</td>
              </tr>
              <tr>
                <td class="em_blue em_font_22" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 26px; line-height: 29px; color:#264780; font-weight:bold;">Nuevo Mensaje!</td>
              </tr>
              <tr>
                <td height="14" style="height:14px; font-size:0px; line-height:0px;">&nbsp;</td>
              </tr>
              <tr>
                <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#434343;">Tienes un nuevo mensaje enviado desde nuestro sitio web</td>
              </tr>
              <tr>
                <td height="26" style="height:26px;" class="em_h20">&nbsp;</td>
              </tr>
              <tr>
                <td align="center" valign="top"><table width="250" style="width:250px; background-color:#6bafb2; border-radius:4px;" border="0" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#fff; font-style:bold">${ name }
                    <br class="em_hide" />
                    ${ email }</td>
                  </tr>
                </table>
                </td>
              </tr>
              <tr>
                <td height="25" style="height:25px;" class="em_h20">&nbsp;</td>
              </tr>
              <tr>
                <td class="em_grey" align="center" valign="top" style="font-family: Arial, sans-serif; font-size: 16px; line-height: 26px; color:#434343;">${ text }</td>
              </tr>
              <tr>
                <td height="44" style="height:44px;" class="em_h20">&nbsp;</td>
              </tr>
            </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
</table>
</body>
</html>
        `
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
    
};

module.exports = sendMail;