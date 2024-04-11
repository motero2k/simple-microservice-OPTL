// routes/test2Routes.js

import { Router } from 'express';
const router = Router();

// Importa el controlador
import { getTest2 } from '../controllers/test2Controller.js';

// Define la ruta y asigna el controlador
router.get('/', getTest2);

export default router;