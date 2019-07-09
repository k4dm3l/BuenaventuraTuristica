/***************************** 
 * Requerimientos de Modulos *
 * ***************************/
require('dotenv').config({path: __dirname + '/.env'});
const express = require("express");
const path = require('path'); //manejo de rutas SO del server
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

/**************************** 
 * Declaracion de variables *
 * **************************/
const app = express();
const PORT = process.env.PORT || 80;

/***************************************************************************/
/********************************** 
 * Setteo Variables Globales *
 * ********************************/
app.set('port', PORT); //Se establece el puerto del servidor
app.set('views', path.join(__dirname, 'views'));//obtener ruta de los archivos de las vistas (views)
app.set('view engine', 'ejs');//indicar motor de plantillas

/***************************************************************************/
/********************** 
 * Archivos Estaticos *
 * ********************/
app.use(express.static(path.join(__dirname, 'public')));

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
app.listen(app.get('port'), () => {
    console.log("Servidor Corriendo ", app.get('port'));
});
/***************************************************************************/