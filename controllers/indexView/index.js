const { Router } = require('express');
const router = Router();

/* Ruta De La Página de Aterrizaje */
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;