const { Router } = require('express');
const router = Router();

const Productos = require('../../models/Producto');
const { isAuthenticated } = require('../../helpers/auth');

router.get('/crearProducto', isAuthenticated, (req, res) => {
    res.render('product/create')
});

router.get('/editarProducto', isAuthenticated, async(req, res) => {
    const listarProductos = await Productos.find({ user: req.user.id }).sort({ fechaIngresoProducto: 'desc' });
    res.render('product/update', { listarProductos });
});

router.get('/p:id', isAuthenticated, async(req, res) => {
    const producto = await Productos.findById(req.params.id);
    res.render('product/updatee', { producto });
});

router.get('/eliminarProducto', isAuthenticated, async(req, res) => {
    const listarProductos = await Productos.find({ user: req.user.id }).sort({ fechaIngresoProducto: 'desc' });
    res.render('product/delete', { listarProductos });
});

module.exports = router;