const { Router } = require('express');
const router = Router();

const Usuario = require('../../models/User');
const passport = require('passport');

router.post('/signupuser', async(req, res) => {
    const { nombre, email, contrasena, confirmarContrasena } = req.body;
    const errors = [];

    if (nombre.length <= 0) {
        errors.push({ text: 'Ingresar Nombre De Usuario' });
    }

    if (email.length <= 0) {
        errors.push({ text: 'Ingresar Correo Electrónico' });
    }

    if (contrasena.length <= 0) {
        errors.push({ text: 'Ingresar Una Contraseña' });
    } else if (contrasena.length < 4) {
        errors.push({ text: 'La Contraseña Debe Ser Mayor A 4 Caracteres' });
    }

    if (contrasena != confirmarContrasena) {
        errors.push({ text: 'Las Contraseñas No Coinciden' });
    }

    if (errors.length > 0) {
        res.render('user/signup', {
            errors,
            nombre,
            email,
            contrasena,
            confirmarContrasena
        });
    } else {
        const emailUser = await Usuario.findOne({ email: email })

        if (emailUser) {
            req.flash('mensajeFallido', 'El Correo Electrónico Ya Existe');
            res.redirect('/signup');
        }

        const usuario = new Usuario({ nombre, email, contrasena });
        usuario.contrasena = await usuario.encryptPassword(contrasena);
        await usuario.save();
        req.flash('mensajeExitoso', 'Registro Exitoso');
        res.redirect('/signin');
    }
});

/* Utiliza la autenticación definida en el localStrategy */
router.post('/signinuser', passport.authenticate('local', {
    successRedirect: '/crearIngrediente',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;