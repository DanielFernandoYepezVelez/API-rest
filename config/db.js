const mongoose = require('mongoose');

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Conectandome a la BD ONLINE');
    });

/* FORMA #1 PARA CONECTARME A LA BD
mongoose.connect('mongodb://localhost/cafe', { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base De Datos ONLINE');
}); */

/* FORMA #2 PARA CONECTARME A LA BD
mongoose.connect('mongodb://localhost/clasegeek', {
        useNewUrlParser: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)); */