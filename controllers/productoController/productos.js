const { Router } = require('express');
const router = Router();
// const body = require('body-parser');

let Producto = require('../../models/Producto');
const { isAuthenticated } = require('../../helpers/auth');

router.get('/producto', isAuthenticated, async(req, res) => {
    const listarProductos = await Producto.find().sort({ fechaIngresoProducto: 'desc' });
    res.render('product/read', { listarProductos });
    /* -------------------------------------------------- */

    /* // .populate('Ingredientes')
    .exec((err, productos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            productos
        });
    }); */
});

router.post('/producto', isAuthenticated, async(req, res) => {
    const errors = [];
    let {
        nombreDelPan,
        saborDePan,
        cantidadPanes,
        estadoVenta,
        fechaIngresoProducto
    } = req.body;

    if (!nombreDelPan) {
        errors.push({
            text: 'Ingrese el nombre del pan',
        });
    }

    if (errors.length > 0) {
        res.render('product/create', {
            errors
        });
    } else {
        const productoPost = new Producto({
            nombreDelPan,
            saborDePan,
            cantidadPanes,
            estadoVenta,
            fechaIngresoProducto
        });

        await productoPost.save();
        res.redirect('/producto');
    }
    // ----------------------------------

    /*     let body = req.body;
        let producto = new Producto({
            nombreDelPan: body.nombreDelPan,
            tipoDePan: body.tipoDePan,
            cantidadPanes: body.cantidadPanes,
            estadoVenta: body.estadoVenta,
        });

        producto.save((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(201).json({
                ok: true,
                productos: productoDB
            });
        }); */
});

router.put('/producto/:id', isAuthenticated, async(req, res) => {
    let {
        nombreDelPan,
        saborDePan,
        cantidadPanes,
        estadoVenta,
        fechaIngresoProducto
    } = req.body;

    await Producto.findByIdAndUpdate(req.params.id, {
        nombreDelPan,
        saborDePan,
        cantidadPanes,
        estadoVenta,
        fechaIngresoProducto
    });
    res.redirect('/editarProducto');
    /* ------------------------------------------- *

        /* let id = req.params.id;
        let body = req.body;
        Producto.findById(id, (err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'El ID Del Producto No Existe, Ingrese Otro.'
                    }
                });
            }

            productoDB.nombreDelPan = body.nombreDelPan;
            productoDB.tipoDePan = body.tipoDePan;
            productoDB.cantidadPanes = body.cantidadPanes;
            productoDB.estadoVenta = body.estadoVenta;

            productoDB.save((err, productoGuardado) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    productos: productoGuardado
                });
            });
        }); */
});

router.delete('/producto/:id', isAuthenticated, async(req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/eliminarProducto');
    /* ------------------------------------------------ */

    /* let id = req.params.id;
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: 'El ID Del Producto No Existe, Ingrese Otro.'
                }
            });
        }
        productoDB.estadoVenta = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productoBorrado,
                mensaje: 'Cambio el estado a false, No borra fisicamente'
            });
        });
    }); */
});

module.exports = router;