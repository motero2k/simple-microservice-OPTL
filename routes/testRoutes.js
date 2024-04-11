// routes/testRoutes.js

import { Router } from 'express';
const router = Router();

// Importa el controlador
import { getTest } from '../controllers/testController.js';

// Define la ruta y asigna el controlador
router.get('/', getTest);

export default router;