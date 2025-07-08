import { getAllCategorias, getCategoriaById, createCategoria as createCategoriaModel, updateCategoria, deleteCategoria } from '../models/categoriaFunkoModel.js';

// Obtengo todas las categorias con filtros
export const getCategorias = async (req, res) => {
  try {
    let categorias = await getAllCategorias();

    // Filtros de ruta categorias
    if (req.query.id) {
      categorias = categorias.filter(c => c._id.toString() === req.query.id);
    }
    if (req.query.nombre) {
      const nombre = req.query.nombre.toLowerCase();
      categorias = categorias.filter(c => c.nombre.toLowerCase().includes(nombre));
    }
    if (req.query.descripcion) {
      const descripcion = req.query.descripcion.toLowerCase();
      categorias = categorias.filter(c => c.descripcion?.toLowerCase().includes(descripcion));
    }
    if (req.query.tags) {
      const tags = req.query.tags.split(',').map(tag => tag.toLowerCase());
      categorias = categorias.filter(c => c.tags?.some(tag => tags.includes(tag.toLowerCase())));
    }
    if (req.query.paisOrigen) {
      const pais = req.query.paisOrigen.toLowerCase();
      categorias = categorias.filter(c => c.paisOrigen?.toLowerCase() === pais);
    }
    if (req.query.material) {
      const material = req.query.material.toLowerCase();
      categorias = categorias.filter(c => c.material?.toLowerCase() === material);
    }

    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
};

 // Obtengo una categoría por su ID
export const getCategoria = async (req, res) => {
  try {
    const categoria = await getCategoriaById(req.params.id);
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
};

// Crear una nueva categoría
export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, tags, paisOrigen, material } = req.body;

    if (!nombre || !descripcion || !tags || !paisOrigen || !material) {
      return res.status(400).json({ error: 'Faltan datos requeridos (nombre, descripcion, tags, paisOrigen, material)' });
    }

    const newCategoria = {
      nombre,
      descripcion,
      tags,
      paisOrigen,
      material
    };

    const categoriaCreada = await createCategoriaModel(newCategoria);
    res.status(201).json(categoriaCreada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una categoría
export const updateCategoriaData = async (req, res) => {
  try {
    const updatedCategoria = await updateCategoria(req.params.id, req.body);
    if (updatedCategoria) {
      res.json(updatedCategoria);
    } else {
      res.status(404).json({ error: 'No se pudo actualizar la categoría' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una categoría
export const deleteCategoriaData = async (req, res) => {
  try {
    const success = await deleteCategoria(req.params.id);
    if (success) {
      res.status(200).json({ message: 'Categoría eliminada con éxito' });
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: 'ID inválido' });
  }
};
