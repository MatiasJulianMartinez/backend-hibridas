import express from "express";
import jwt from "jsonwebtoken";
import * as UsersManager from "../models/UsersManager.js";
import { validateUserData } from "../middleware/validateUserData.js";
import { validateUpdateUserData } from "../middleware/validateUpdateUserData.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const SECRET_KEY = "tu_clave_secreta";

// GET: Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await UsersManager.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// GET: Obtener usuario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UsersManager.getUserById(id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
});

// POST: Crear usuario (requiere todos los campos)
router.post("/", validateUserData, async (req, res) => {
  const user = req.body;
  try {
    const userId = await UsersManager.createUser(user);
    res.status(201).json({ userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

// PUT: Actualizar usuario (password es opcional)
router.put("/:id", validateUpdateUserData, verificarToken, async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    const success = await UsersManager.updateUser(id, updatedUser);
    if (!success)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
});

// DELETE: Eliminar usuario
router.delete("/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  try {
    const success = await UsersManager.deleteUser(id);
    if (!success)
      return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
});

// POST: Registro
router.post("/register", validateUserData, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await UsersManager.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    const newUser = { name, email, password, role };
    const user = await UsersManager.createUser(newUser);

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Usuario registrado exitosamente", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
});

// POST: Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersManager.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar hacer login" });
  }
});

export default router;
