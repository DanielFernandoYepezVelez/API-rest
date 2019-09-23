require('./config/config'); //PUERTO HEROKU
require('./config/db'); //BD CONECTANDOME
/* --------------------------------------- */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const app = express();
/* --------------------------------------- */

require('./auth/passport'); //AATENTICACIÓN DE PASSPORT

/* SETTINGS */
/* Show Format json in the Browser */
app.set('spaces json', 2);
/*STEPS FOR CONFIG THE '/views/' FOLDER*/
/*1.Node Searching the '/views/' folder */
/*2.join() => Unir folders */
/*3.__dirname => Return the path(folder) of a running(ejecutandose) file */
/*4.'/views/' => Concat the folder(__dirname) with the folder 'views' */
app.set('./views/', path.join(__dirname, './views/'));
/* CONFIG THE ENGINE OF PLANTILLAS EXPRESS-HANDLEBARS */
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('./views/'), './layout/'),
    partialsDir: path.join(app.get('./views/'), './partials/'),
    extname: '.hbs'
}));
/* Using the engine of plantillas */
app.set('view engine', '.hbs');
/* --------------------------------------- */

/* MIDDLEWARES(Métodos que se ejecutan antes de llegar al servidor
               o a las rutas)*/
/* Server Response */
app.use(morgan('dev'));
/* Externals Forms  */
app.use(bodyParser.urlencoded({ extended: false }));
/* app.use(express.urlencoded({ extended: false })); No imagenes only DATA */
/* Convert to json */
app.use(bodyParser.json());
/* Methods GET, POST, PUT, DELETE */
app.use(methodOverride('_method'));
/* Session */
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
/* Passport Debe ir despues de Session */
app.use(passport.initialize());
app.use(passport.session()); //Incia la session de arriba
/* Flash */
app.use(flash());
/* --------------------------------------- */

/* Message In All Views */
/*Use The Paramater next for que el navegador no se
quede cargando de forma infinita y continue
con el flujo del codigo(Routes)*/
/* Variables Globales */
app.use((req, res, next) => {
    res.locals.mensajeExitoso = req.flash('mensajeExitoso');
    res.locals.mensajeFallido = req.flash('mensajeFallido');
    res.locals.error = req.flash('error'); //Passport guarda el error en una variable global llamada error.
    res.locals.user = req.user || null; //Passport guarda los datos del registro del usuario en una variable global llamada user.
    next();
});
/* --------------------------------------- */

/* All Routes */
app.use(require('./routes/routes'));
/* --------------------------------------- */

/* Static Files */
/* Todo lo que esta en public puede ser accedido desde
fuera o dentro del código a través de la URL correcta.*/
app.use(express.static(path.join(__dirname, './public/')));
/* --------------------------------------- */

/* Starting the Server */
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
});