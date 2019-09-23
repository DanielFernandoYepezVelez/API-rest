const helpers = {};

/* Esta es la función definida, pero aun no se esta utilizando */
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash('mensajeFallido', 'El usuario no ha iniciado Sesion');
    res.redirect('/signin');
};

module.exports = helpers;