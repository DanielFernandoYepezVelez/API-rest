/* Declarar constante o variables
de forma GLOBAL */
/*
==========================
       Puerto
==========================
*/
/* MODIFICANDO EL OJETO GLOBAL PROCESS */
process.env.PORT = process.env.PORT || 3000;

/* ==========================
       Entorno
========================== */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* ==========================
       Base De Datos, En Local O en Mongo Atlas
========================== */
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/panPanVinoVino';
} else {
    //urlDB = 'mongodb+srv://DanielFernandoYepezVelez:SsFjmPowOMhf4tJ1@cluster0-iw8eb.mongodb.net/panPanVinoVino';
       urlDB = 'mongodb+srv://DanielFernandoYepezVelez:PgAZZbRp4BOrlQNK@cluster0.iw8eb.mongodb.net/panPanVinoVino'
}
process.env.urlDB = urlDB;
