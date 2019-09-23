const { Router } = require('express');
const router = Router();

const Usuario = require('../../models/User');
const passport = require('passport');

router.post('/signupuser', async(req, res) => {
    const { nombre, email, contrasena, confirmarContrasena } = req.body;
    const errors = [];

    if (nombre.length <= 0) {
        errors.push({ text: 'Ingrese nombre de usuario' });
    }

    if (contrasena != confirmarContrasena) {
        errors.push({ text: 'Las contraseña no coinciden' });
    }

    if (contrasena.length < 4) {
        errors.push({ text: 'La contraseña debe ser mayor a 4 caracteres' });
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
            req.flash('mensajeFallido', 'El correo electronico ya existe');
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