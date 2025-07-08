import {
  getAllFunkos,
  getFunkoById,
  createFunko,
  updateFunko,
  deleteFunko,
} from "../models/funkoPopModel.js";
import { getCategoriaById } from "../models/categoriaFunkoModel.js";

// Obtengo todos los Funkos (con filtros y nombres de usuario/categoría)
export const getFunkos = async (req, res) => {
  try {
    let funkos = await getAllFunkos();

    // Filtros por nombre
    if (req.query.nombre) {
      const nombre = req.query.nombre.toLowerCase();
      funkos = funkos.filter((f) => f.nombre.toLowerCase().includes(nombre));
    }
    // Filtros por precio
    if (req.query.precio) {
      const precio = parseFloat(req.query.precio);
      funkos = funkos.filter((f) => f.precio <= precio);
    }
    // filtro por categoría
    if (req.query.categoriaId) {
      const categoriaId = req.query.categoriaId;
      funkos = funkos.filter(
        (f) => f.categoria?._id.toString() === categoriaId
      );
    }
    // filtro por tipo
    if (req.query.tipo) {
      const tipo = req.query.tipo.toLowerCase();
      funkos = funkos.filter((f) => f.tipo?.toLowerCase() === tipo);
    }

    const resultado = funkos.map((f) => ({
      _id: f._id,
      nombre: f.nombre,
      descripcion: f.descripcion,
      precio: f.precio,
      imagen: f.imagen,
      stock: f.stock,
      tipo: f.tipo,
      categoria: f.categoria?.nombre || "Categoría no encontrada",
      categoriaId: f.categoria?._id || "", 
      usuario: f.userId?.name || "Usuario no encontrado",
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los Funkos" });
  }
};

// Obtengo un Funko por su ID
export const getFunko = async (req, res) => {
  try {
    const funko = await getFunkoById(req.params.id);
    if (!funko) {
      return res.status(404).json({ error: "Funko no encontrado" });
    }

    res.json({
      _id: funko._id,
      nombre: funko.nombre,
      descripcion: funko.descripcion,
      precio: funko.precio,
      imagen: funko.imagen,
      stock: funko.stock,
      tipo: funko.tipo,
      categoria: funko.categoria?.nombre || "Categoría no encontrada",
      usuario: funko.userId?.name || "Usuario no encontrado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el Funko" });
  }
};

// Creacion de un nuevo Funko
export const addFunko = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen, tipo, categoriaId } =
      req.body;
    const userId = req.user._id;

    if (!nombre || !precio || !stock || !categoriaId || !tipo) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const nuevaCategoria = await getCategoriaById(categoriaId);
    if (!nuevaCategoria) {
      return res.status(400).json({ error: "Categoría no válida" });
    }

    const nuevoFunko = await createFunko({
      nombre,
      descripcion,
      precio,
      stock,
      imagen,
      tipo,
      categoria: categoriaId,
      userId,
    });

    const funkoConPopulated = await getFunkoById(nuevoFunko._id);

    res.status(201).json({
      _id: funkoConPopulated._id,
      nombre: funkoConPopulated.nombre,
      descripcion: funkoConPopulated.descripcion,
      precio: funkoConPopulated.precio,
      imagen: funkoConPopulated.imagen,
      stock: funkoConPopulated.stock,
      tipo: funkoConPopulated.tipo,
      categoria:
        funkoConPopulated.categoria?.nombre || "Categoría no encontrada",
      usuario: funkoConPopulated.userId?.name || "Usuario no encontrado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el Funko" });
  }
};

// Actualizar un Funko existente
export const updateFunkoData = async (req, res) => {
  try {
    const updated = await updateFunko(req.params.id, req.body);
    if (!updated) {
      return res
        .status(404)
        .json({ error: "Funko no encontrado para actualizar" });
    }

    const funkoActualizado = await getFunkoById(updated._id);

    res.json({
      _id: funkoActualizado._id,
      nombre: funkoActualizado.nombre,
      descripcion: funkoActualizado.descripcion,
      precio: funkoActualizado.precio,
      imagen: funkoActualizado.imagen,
      stock: funkoActualizado.stock,
      tipo: funkoActualizado.tipo,
      categoria:
        funkoActualizado.categoria?.nombre || "Categoría no encontrada",
      usuario: funkoActualizado.userId?.name || "Usuario no encontrado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Funko" });
  }
};

// Eliminar un Funko
export const deleteFunkoData = async (req, res) => {
  try {
    const deleted = await deleteFunko(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ error: "Funko no encontrado para eliminar" });
    }
    res.json({ message: "Funko eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el Funko" });
  }
};
