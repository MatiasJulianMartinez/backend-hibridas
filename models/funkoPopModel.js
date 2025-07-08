import mongoose from "mongoose";
import Categoria from "./categoriaFunkoModel.js";

const funkoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    default: "",
  },
  imagen: {
    type: String,
    default: "",
  },
  precio: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  lanzamiento: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Funko = mongoose.model("Funko", funkoSchema);

// Obtengo todos los funkos
export const getAllFunkos = async () => {
  return await Funko.find().populate("categoria").populate("userId", "name");
};

// Obtengo un funko por ID
export const getFunkoById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de Funko no válido");
  }
  return await Funko.findById(id)
    .populate("categoria")
    .populate("userId", "name");
};

// Crear nuevo funko
export const createFunko = async (funkoData) => {
  const categoriaId = funkoData.categoriaId || funkoData.categoria;

  const categoria = await Categoria.findById(categoriaId);
  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  const funko = new Funko({
    nombre: funkoData.nombre,
    descripcion: funkoData.descripcion || "",
    imagen: funkoData.imagen || "",
    precio: funkoData.precio,
    tipo: funkoData.tipo,
    categoria: categoriaId,
    stock: funkoData.stock,
    userId: funkoData.userId,
  });

  return await funko.save();
};

// Actualizar funko
export const updateFunko = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de Funko no válido");
  }

  if (data.categoriaId || data.categoria) {
    const categoriaId = data.categoriaId || data.categoria;
    const categoria = await Categoria.findById(categoriaId);
    if (!categoria) {
      throw new Error("Categoría no encontrada");
    }
    data.categoria = categoriaId;
    delete data.categoriaId;
  }

  return await Funko.findByIdAndUpdate(id, data, { new: true })
    .populate("categoria")
    .populate("userId");
};

// Eliminar funko
export const deleteFunko = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID de Funko no válido");
  }

  const result = await Funko.findByIdAndDelete(id);
  return result !== null;
};

export default Funko;
