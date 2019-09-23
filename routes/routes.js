const { Router } = require('express');
const router = Router();
router.use(require('../controllers/indexView/index'));
router.use(require('../controllers/usuarioController/usuario'));
router.use(require('../controllers/usuarioView/usuario'));
router.use(require('../controllers/ingredienteController/ingredientes'));
router.use(require('../controllers/ingredienteView/ingredientes'));
router.use(require('../controllers/productoController/productos'));
router.use(require('../controllers/productoView/productos'));

module.exports = router;