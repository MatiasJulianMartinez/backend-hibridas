import mongoose from 'mongoose';
// 1. Defino el esquema de la categoría de Funko
const categoriaFunkoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  paisOrigen: {
    type: String,
    trim: true
  },
  material: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// 2. Creo el modelo
const Categoria = mongoose.model('Categoria', categoriaFunkoSchema);

// 3. Funciones 

// Obtengo todas las categorías
export const getAllCategorias = async () => {
  return await Categoria.find();
};

// Obtengo una categoría por ID
export const getCategoriaById = async (id) => {
  return await Categoria.findById(id);
};

// Crear una nueva categoría
export const createCategoria = async (newCategoria) => {
  const categoria = new Categoria(newCategoria);
  return await categoria.save();
};

// Actualizar una categoría existente
export const updateCategoria = async (id, updatedCategoria) => {
  return await Categoria.findByIdAndUpdate(id, updatedCategoria, { new: true });
};

// Eliminar una categoría
export const deleteCategoria = async (id) => {
  const result = await Categoria.findByIdAndDelete(id);
  return !!result;
};

export default Categoria;
