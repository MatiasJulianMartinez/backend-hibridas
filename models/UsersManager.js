import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Esquema del usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "cliente"],
    default: "cliente",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hashear contraseña antes de guardar si fue modificada
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas al hacer login
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error("Error al comparar la contraseña");
  }
};

// Crear modelo
const User = mongoose.model("User", userSchema);



// Obtener todos los usuarios
export const getAllUsers = async () => {
  return await User.find();
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  return await User.findById(id);
};

// Crear un nuevo usuario
export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Actualizar usuario (hashea password si se incluye)
export const updateUser = async (id, data) => {
  const updateData = { ...data };

  if (updateData.password && updateData.password.trim() !== "") {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  } else {
    delete updateData.password;
  }
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Eliminar usuario
export const deleteUser = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result !== null;
};

// Buscar por email
export const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export default User;
