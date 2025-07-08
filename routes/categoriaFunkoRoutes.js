import express from 'express';
import { getCategorias, getCategoria, updateCategoriaData, createCategoria, deleteCategoriaData } from '../controllers/categoriaFunkoController.js';
import { validateCategoriaData } from '../middleware/validateCategoriaData.js';
import { verificarToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Obtengo todas las categorías (pública)
router.get('/', getCategorias);

// Obtengo una categoría por ID (pública)
router.get('/:id', getCategoria);

// Crear una nueva categoría (requiere token) (con validación)
router.post('/', verificarToken, validateCategoriaData, createCategoria);

// Actualizar una categoría existente (requiere token) (con validación)
router.put('/:id', verificarToken, validateCategoriaData, updateCategoriaData);

// Eliminar una categoría (requiere token) (con validación)
router.delete('/:id', verificarToken, deleteCategoriaData);

export default router;
