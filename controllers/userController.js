import { getAllUsers, getUserById, createUser, deleteUser, updateUser } from "../models/UserModel.js"; 

// Obtengo todos los usuarios
const getUsers = async (request, response) => {
  try {
    const users = await getAllUsers(); 
    response.status(200).json({ msg: 'ok', data: users });
  } catch (error) {
    console.error({ error });
    response.status(500).json({ msg: 'Error del servidor', data: [] });
  }
};

// Obtengo un usuario por ID
const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await getUserById(id); 

    if (user) {
      response.status(200).json({ msg: 'ok', data: user });
    } else {
      response.status(404).json({ msg: 'No se encontró el usuario', data: {} });
    }
  } catch (error) {
    console.error({ error });
    response.status(500).json({ msg: 'Error del servidor', data: [] });
  }
};

// Crear un nuevo usuario
const setUser = async (request, response) => {
  try {
    const user = request.body;
    const newUser = await createUser(user); 
    response.status(201).json({ msg: 'Usuario creado', data: newUser });
  } catch (error) {
    console.error({ error });
    response.status(500).json({ msg: 'Error del servidor' });
  }
};

// Eliminar un usuario por ID
const deleteUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const status = await deleteUser(id); 

    if (status) {
      response.status(200).json({ msg: 'Usuario eliminado', data: [] });
    } else {
      response.status(404).json({ msg: 'No se encontró el usuario', data: [] });
    }
  } catch (error) {
    console.error({ error });
    response.status(500).json({ msg: 'Error del servidor', data: [] });
  }
};

// Actualizar un usuario por ID
const updateUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = request.body;

    const updatedUser = await updateUser(id, user); 

    if (updatedUser) {
      response.status(200).json({ msg: 'Usuario actualizado', data: updatedUser });
    } else {
      response.status(404).json({ msg: 'No se encontró el usuario', data: {} });
    }
  } catch (error) {
    console.error({ error });
    response.status(500).json({ msg: 'Error del servidor', data: [] });
  }
};


// Ruta para login
const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Busco el usuario por el email
    const foundUser = await getUserByEmail(email);
    if (!foundUser) {
      console.log('Usuario no encontrado');
      return response.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verifico la contraseña usando el método comparePassword
    const isPasswordCorrect = await foundUser.comparePassword(password);
    if (!isPasswordCorrect) {
      console.log('Contraseña incorrecta');
      return response.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Si las credenciales son correctas, generar un JWT
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.SECRET_KEY, 
      { expiresIn: '1h' }
    );

    console.log('Login exitoso, token generado:', token);

    // Me responde con el token
    response.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en el servidor:', error);
    response.status(500).json({ msg: 'Error del servidor' });
  }
};


export { getUsers, getUserById, setUser, deleteUserById, updateUserById, login };
