// middleware/validateUpdateUserData.js

export const validateUpdateUserData = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Faltan datos requeridos (name, email)' });
  }

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'El nombre debe ser un texto válido' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'El email no es válido' });
  }

  if (password && (typeof password !== 'string' || password.length < 6)) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres si se incluye' });
  }

  next();
};
