const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('./dogs')
const temperamentRouter = require('./temperaments')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRouter)
router.use('/temperaments', temperamentRouter)

module.exports = router;

