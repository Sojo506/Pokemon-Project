const { Router } = require("express");

const { getTypes } = require("../controllers/TipoController");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// TYPES
router.get("/", getTypes);

module.exports = router;
