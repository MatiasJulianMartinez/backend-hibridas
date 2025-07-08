import express from 'express';
import { getFunkos, getFunko, addFunko, updateFunkoData, deleteFunkoData } from '../controllers/funkoPopController.js';
import { validateFunkoData } from '../middleware/validateFunkoData.js';
import { verificarToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Obtengo todos los funkos (pública)
router.get('/', getFunkos);

// Obtengo un funko por ID (pública)
router.get('/:id', getFunko);

// Crear un nuevo funko (requiere token) (con validación)
router.post('/', verificarToken, validateFunkoData, addFunko);

// Actualizar un funko existente (requiere token) (con validación)
router.put('/:id', verificarToken, validateFunkoData, updateFunkoData);

// Eliminar un funko (requiere token)
router.delete('/:id', verificarToken, deleteFunkoData);

export default router;
