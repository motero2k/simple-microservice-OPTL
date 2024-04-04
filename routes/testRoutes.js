// routes/testRoutes.js

const express = require('express');
const router = express.Router();

// Importa el controlador
const testController = require('../controllers/testController');

// Define la ruta y asigna el controlador
router.get('/', testController.getTest);

module.exports = router;