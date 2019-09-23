const { Router } = require('express');
const router = Router();

// Objeto Guarda el modelo.
const Ingredientes = require('../../models/Ingrediente');
const { isAuthenticated } = require('../../helpers/auth');

router.get('/ingrediente', isAuthenticated, async(req, res) => {
    const listarIngredientes = await Ingredientes.find({ user: req.user.id }).sort({ fechaIngresoIngrediente: 'desc' });
    res.render('ingredient/read', { listarIngredientes });
    /* ---------------------------------------------------- */

    // .exec((err, ingredienteDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         ingredientes: ingredienteDB
    //     });
    // });
});

router.post('/ingrediente', isAuthenticated, async(req, res) => {
    // Trae todo lo que hay en el body(Formulario Model)
    // let body = req.body;
    const errors = [];
    let {
        nombreIngrediente,
        tipoMedidaIngrediente,
        tipoMedidaIngredienteSolido,
        valorTipoMedidaIngredienteSolido,
        tipoMedidaIngredienteLiquido,
        valorTipoMedidaIngredienteLiquido,
        cantidadUnitariaIngrediente,
        fechaIngresoIngrediente
    } = req.body;

    /* Parseando Los Valores */
    parseFloat(valorTipoMedidaIngredienteSolido);
    parseFloat(valorTipoMedidaIngredienteLiquido);

    if (!nombreIngrediente) {
        errors.push({
            text: 'Ingrese el nombre del ingrediente',
        });
    }
    if (!valorTipoMedidaIngredienteSolido && !valorTipoMedidaIngredienteLiquido) {
        errors.push({
            text: 'Ingresar Un Valor Para Kilogramos O Litros',
        });
    }
    if (!valorTipoMedidaIngredienteSolido) {
        valorTipoMedidaIngredienteSolido = 0;
    }
    if (!valorTipoMedidaIngredienteLiquido) {
        valorTipoMedidaIngredienteLiquido = 0;
    }
    if (!cantidadUnitariaIngrediente) {
        errors.push({
            text: 'Ingresar Una Cantidad Unitaria Del Ingrediente',
        });
    }
    if (!fechaIngresoIngrediente) {
        fechaIngresoIngrediente = Date.now();
    }
    if (errors.length > 0) {
        res.render('ingredient/create', {
            errors,
            nombreIngrediente,
            tipoMedidaIngredienteSolido,
            valorTipoMedidaIngredienteSolido,
            tipoMedidaIngredienteLiquido,
            valorTipoMedidaIngredienteLiquido,
            cantidadUnitariaIngrediente,
            fechaIngresoIngrediente
        });
    } else {
        const ingredientePost = new Ingredientes({
            nombreIngrediente,
            tipoMedidaIngredienteSolido,
            valorTipoMedidaIngredienteSolido,
            tipoMedidaIngredienteLiquido,
            valorTipoMedidaIngredienteLiquido,
            cantidadUnitariaIngrediente,
            fechaIngresoIngrediente
        });
        /* Relaciono el ingrediente creado para el usuario
        de la sesion Iniciada.
        Passport en user, guarda todos los datos del usuario,
        pero solo quiero el id para enlazarlo con el ingrediente
        creado.*/
        ingredientePost.user = req.user.id;
        await ingredientePost.save();
        /* Despues de guardar El ingediente*/
        req.flash('mensajeExitoso', 'Ingrediente Agregado Correctamente');
        res.redirect('/ingrediente');
    }
    /* ---------------------------------------------------- */

    /* Instancia que se trae todos lo metodos 
    y atributos de mongoose y el modelo porque
    se necesita guardar los datos en la BD.
    let ingredientePost = new Ingredientes({
        nombreIngrediente: body.nombreIngrediente,
        tipoMedidaIngredienteSolido: body.tipoMedidaIngredienteSolido,
        valorTipoMedidaIngredienteSolido: body.valorTipoMedidaIngredienteSolido,
        tipoMedidaIngredienteLiquido: body.tipoMedidaIngredienteLiquido,
        valorTipoMedidaIngredienteLiquido: body.valorTipoMedidaIngredienteLiquido,
        cantidadUnitariaIngrediente: body.cantidadUnitariaIngrediente,
        fechaIngresoIngrediente: body.fechaIngresoIngrediente
    });
    // Método Mongoose Para Guardar
    ingredientePost.save((err, ingredienteDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        // El estatus 200 ya esta implicito
        res.json({
            ok: true,
            ingredientes: ingredienteDB
        });
    }); */
});

router.put('/ingrediente/:id', isAuthenticated, async(req, res) => {
    let {
        nombreIngrediente,
        tipoMedidaIngredienteSolido,
        valorTipoMedidaIngredienteSolido,
        tipoMedidaIngredienteLiquido,
        valorTipoMedidaIngredienteLiquido,
        cantidadUnitariaIngrediente,
        fechaIngresoIngrediente
    } = req.body;

    if (!tipoMedidaIngredienteSolido || tipoMedidaIngredienteSolido) {
        tipoMedidaIngredienteSolido = 'Kilogramos';
    }
    if (!valorTipoMedidaIngredienteSolido) {
        valorTipoMedidaIngredienteSolido = 0;
    }
    if (!tipoMedidaIngredienteLiquido || tipoMedidaIngredienteLiquido) {
        tipoMedidaIngredienteLiquido = 'Litros';
    }
    if (!valorTipoMedidaIngredienteLiquido) {
        valorTipoMedidaIngredienteLiquido = 0;
    }
    if (!cantidadUnitariaIngrediente) {
        cantidadUnitariaIngrediente = 0;
    }
    if (!fechaIngresoIngrediente || fechaIngresoIngrediente) {
        fechaIngresoIngrediente = Date.now();
    }
    await Ingredientes.findByIdAndUpdate(req.params.id, {
        nombreIngrediente,
        tipoMedidaIngredienteSolido,
        valorTipoMedidaIngredienteSolido,
        tipoMedidaIngredienteLiquido,
        valorTipoMedidaIngredienteLiquido,
        cantidadUnitariaIngrediente,
        fechaIngresoIngrediente
    });
    req.flash('mensajeExitoso', 'Ingrediente Actualizado Correctamente');
    res.redirect('/editarIngrediente');
    /* ---------------------------------------------------- */

    // let id = req.params.id;
    // let body = req.body;
    // Ingredientes.findByIdAndUpdate(id, body, { new: true }, (err, ingredienteDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!ingredienteDB) {
    //         return res.status(404).json({
    //             ok: false,
    //             message: 'El ID Del Ingrediente No Existe, Ingrese Otro.'
    //         });
    //     }

    //     res.json({
    //         // id: id,
    //         // id
    //         ok: true,
    //         ingredientes: ingredienteDB
    //     });
    // });
});

// Borrando el Ingrediendete Por Completo
router.delete('/ingrediente/:id', isAuthenticated, async(req, res) => {
    await Ingredientes.findByIdAndDelete(req.params.id);
    req.flash('mensajeExitoso', 'Ingrediente Eliminado Correctamente');
    res.redirect('/eliminarIngrediente');
    /* ---------------------------------------------------- */

    // let id = req.params.id;
    // Ingredientes.findByIdAndRemove(id, (err, ingredienteDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!ingredienteDB) {
    //         return res.status(404).json({
    //             ok: false,
    //             message: 'El ID Del Ingrediente No Existe, Ingrese Otro.'
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         ingredientes: ingredienteDB
    //     });
    // });
});

module.exports = router;