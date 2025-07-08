export const validateCategoriaData = (req, res, next) => {
  const { nombre, descripcion, tags, paisOrigen, material } = req.body;

  // Validacion del campo 'nombre'
  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio y debe ser un string no vacío.' });
  }

  // Validacion del campo 'descripcion'
  if (!descripcion || typeof descripcion !== 'string' || descripcion.trim() === '') {
    return res.status(400).json({ error: 'El campo "descripcion" es obligatorio y debe ser un string no vacío.' });
  }

  // Validacion del campo 'tags'
  if (!tags || !Array.isArray(tags) || tags.length === 0 || tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) {
    return res.status(400).json({ error: 'El campo "tags" es obligatorio y debe ser un array de strings no vacíos.' });
  }

  // Validacion del campo 'paisOrigen'
  if (!paisOrigen || typeof paisOrigen !== 'string' || paisOrigen.trim() === '') {
    return res.status(400).json({ error: 'El campo "paisOrigen" es obligatorio y debe ser un string no vacío.' });
  }

  // Validacion del campo 'material'
  if (!material || typeof material !== 'string' || material.trim() === '') {
    return res.status(400).json({ error: 'El campo "material" es obligatorio y debe ser un string no vacío.' });
  }

  next();
};
