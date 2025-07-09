export const validateFunkoData = (req, res, next) => {
  const { nombre, categoriaId, precio, tipo, stock } = req.body;

  // Validacion de todos los campos requeridos
  if (!nombre || !categoriaId || precio === undefined || tipo === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos (nombre, categoriaId, precio, tipo, stock)' });
  }

  // Validacion de que nombre sea un string y no solo espacios
  if (typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre debe ser un texto válido' });
  }

  // Validacion de que tipo sea un string
  if (typeof tipo !== 'string' || tipo.trim() === '') {
    return res.status(400).json({ error: 'El tipo debe ser un texto válido' });
  }

  // Validacion de que tipo sea uno de los valores esperados (por ejemplo, original / réplica / llavero)
  const tiposValidos = ['original', 'replica', 'llavero'];
  if (!tiposValidos.includes(tipo.toLowerCase())) {
    return res.status(400).json({ error: `El tipo debe ser uno de los siguientes: ${tiposValidos.join(', ')}` });
  }

  // Validacion de que el precio sea un número y mayor a 0
  if (isNaN(precio) || Number(precio) <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
  }

  // Validacion de que el stock sea un número entero y mayor o igual a 0
  if (isNaN(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({ error: 'El stock debe ser un número entero mayor o igual a 0' });
  }

  next();
};
