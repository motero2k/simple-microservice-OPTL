// routes/test2Routes.js

const express = require('express');
const router = express.Router();

// Importa el controlador
const test2Controller = require('../controllers/test2Controller');

// Define la ruta y asigna el controlador
router.get('/', test2Controller.getTest2);

module.exports = router;