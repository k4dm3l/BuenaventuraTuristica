/***************************** 
 * Requerimientos de Modulos *
 * ***************************/
require('dotenv').config({path: __dirname + '/.env'});
const express = require("express");
const path = require('path'); //manejo de rutas SO del server
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const http = require('http');
const https = require('https');
const fs = require('fs');

/**************************** 
 * Declaracion de variables *
 * **************************/
const hostname = 'buenaventuraturistica.com';
const httpPort = 80;
const httpsPort = 443;

const httpsOptions = {
    cert: fs.readFileSync(path.resolve('./src/ssl/buenaventuraturistica_com.crt')),
    ca: fs.readFileSync(path.resolve('./ssl/buenaventuraturistica_com.ca-bundle')),
    key: fs.readFileSync(path.resolve('./ssl/buenaventuraturistica.key'))
}

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);



/***************************************************************************/
/********************************** 
 * Setteo Variables Globales *
 * ********************************/
//app.set('port', httpsPort); //Se establece el puerto del servidor
app.set('views', path.join(__dirname, 'views'));//obtener ruta de los archivos de las vistas (views)
app.set('view engine', 'ejs');//indicar motor de plantillas

/**
 * TEST EN LOCAL*  */
//app.set('port', 4000);
 

/***************************************************************************/
/********************** 
 * Archivos Estaticos *
 * ********************/
app.use(express.static(path.join(__dirname, 'public')));

/***************************************************************************/
/***************
 * MiddleWares *
 * *************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'tHisIsMy Secr3t',
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    },
    resave: true
}));
app.use(flash());

/**
 *  Middleware 
 *  Valida si se intenta ingresar a la pagina sin SSH y en caso
 *  tal, redirige al visitante  
 * */
app.use((req, res, next) => {
    if(req.protocol === 'http'){
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});

/***************************************************************************/
/********************** 
 *   Rutas (Routes)   *
 * ********************/
app.use(require('./routes/routes.js'));

/***************************************************************************/


//Verifica si la ruta de la URL exista, en caso de que no, redirecciona a la view not-found.ejs
app.use(function(req, res){
    res.status(404).render("es/not-found.ejs", { title: "No encontrado" });
});

/***************************************************************************/
/********************** 
 * Ejecucion Servidor *
 * ********************/

httpServer.listen(httpPort, hostname, () => {
    console.log(`Server Instance Running ${httpPort}...`);
});
httpsServer.listen(httpsPort, hostname, () => {
    console.log(`Server Instance Running ${httpsPort}...`);
});

/* TEST EN LOCAL*/
//app.listen(app.get('port'), () => {
//    console.log("Servidor Corriendo ", app.get('port'));
//});


/***************************************************************************/