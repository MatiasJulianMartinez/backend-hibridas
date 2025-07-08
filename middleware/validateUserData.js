export const validateUserData = (req, res, next) => {
    const { name, email, password } = req.body;
  
    // Validacion de todos los campos requeridos
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos requeridos (name, email, password)' });
    }
  
    // Validacion de que el nombre sea un string y no solo espacios
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'El nombre debe ser un texto válido' });
    }
  
    // Validacion de que el email sea un string y tenga formato correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== 'string' || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'El email no es válido' });
    }
  
    // Validacion de que la contraseña tenga al menos 6 caracteres
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }
  
    next();
  };
  