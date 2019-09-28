# API-rest

Landing Page =>
router.GET('/') = pagina de aterrizaje|
----------------------------------------------------------------------------------

Ingredients Views =>
router.GET('/crearIngrediente'); = formulario crear Ingrediente |
router.GET('/editarIngrediente'); = formulario editar Ingrediente |
router.GET('/r:id'); = formulario actualizar Ingrediente |
router.GET('/eliminarIngrediente'); = formulario eliminar Ingrediente |

APIs Ingredients => (PROFE OLVIDE EL PREFIJO /API/) =O
router.GET('/ingrediente'); = listar Ingredientes |
router.POST('/ingrediente'); = guardar Ingredientes |
router.PUT('/ingrediente/:id'); = actualizar Ingredientes |
router.DELETE('/ingrediente/:id'); = eliminar Ingredientes |
---------------------------------------------------------------------------------

Products Views =>
router.GET('/crearProducto'); = formulario crear Producto |
router.GET('/editarProducto'); = formulario editar Producto |
router.GET('/p:id'); = formulario actualizar Producto |
router.GET('/eliminarProducto'); = formulario eliminar Producto |

APIs Products => (PROFE OLVIDE EL PREFIJO /API/) =O
router.GET('/producto'); = listar Productos |
router.POST('/producto'); = guardar Productos |
router.PUT('/producto/:id'); = actualizar Productos |
router.DELETE('/producto/:id'); = eliminar Productos |
---------------------------------------------------------------------------------

Users Views =>
router.GET('/signup'); = formulario registrar usuario |
router.GET('/signin'); = formulario inciar sesión |

APIs Users => (PROFE OLVIDE EL PREFIJO /API/) =O
router.POST('/signupuser'); = registro usuario |
router.POST('/signinuser'); = incio sesión usuario |
router.GET('/logout'); = cerrar sesión usuario |
---------------------------------------------------------------------------------
