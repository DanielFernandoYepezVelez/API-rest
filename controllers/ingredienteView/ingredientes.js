const { Router } = require('express');
const router = Router();

const Ingredientes = require('../../models/Ingrediente');
const { isAuthenticated } = require('../../helpers/auth');
/* NOTA SUTIL, PERO IMPORTANTE =>
Redirect => redirecciona rutas.
Render => renderisa vistas.
*/
router.get('/crearIngrediente', isAuthenticated, (req, res) => {
    res.render('ingredient/create');
});

router.get('/editarIngrediente', isAuthenticated, async(req, res) => {
    const listarIngredientes = await Ingredientes.find().sort({ fechaIngresoIngrediente: 'desc' });
    res.render('ingredient/update', { listarIngredientes });
});

router.get('/r:id', isAuthenticated, async(req, res) => {
    const ingrediente = await Ingredientes.findById(req.params.id);
    res.render('ingredient/updatee', { ingrediente });
});

router.get('/eliminarIngrediente', isAuthenticated, async(req, res) => {
    const listarIngredientes = await Ingredientes.find().sort({ fechaIngresoIngrediente: 'desc' });
    res.render('ingredient/delete', { listarIngredientes });
});

module.exports = router;