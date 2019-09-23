const passport = require('passport');
/* Autenticación de forma local */
const localStrategy = require('passport-local').Strategy;

const Usuario = require('../models/User');

/* Estrategia de Autenticación */
passport.use(new localStrategy({
    /* Lo que el usuario envia para autenticarse */
    usernameField: 'email',
    passwordField: 'contrasena'
        /* Función para validar lo que recibo */
}, async(email, contrasena, done) => {
    /* Busco en la BD e instancio el modelo */
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
        /* Retorna todo el proceso de autenticación nuevamente,
        es decir, puede termniar la autenticación con un usuario nuevo,
        mensaje de error */
        /* null => si no existe ningun error
        false => si el usuario no existe
        message => mensaje para el usuario */
        return done(null, false, { message: 'El correo electronico no existe' });

        /* aquí si encontró un usuario */
    } else {
        /* Validamos la contraseña que coincidan con el método match 
        retorna true o false.
        metodo de la instancia SchemaUser del modelo User*/
        const match = await usuario.matchPassword(contrasena);

        if (match) {
            return done(null, usuario);
        } else {
            /* Estos mensajes se guardan a traves de una variable error */
            return done(null, false, { message: 'Contraseña Incorrecta' })
        }
    }
}));

/* Cuando el usuario se autentique correctamente, debemos
  almacenarlo en algún lugar, aquí las sessiones de express
  Almacenamos el id del usuario para que no se tenga que volver
  a logiar*/
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

/* Este metodo hace el proceso inverso, es decir, toma un id y
   genera un usuario */
passport.deserializeUser((id, done) => {

    /* Busca en la BD el id de la sesiòn y luego en la
    busqueda puedo tener un error o puedo encontrarlo y
    lo retorna*/
    Usuario.findById(id, (err, usuario) => {
        done(err, usuario);
    });
});