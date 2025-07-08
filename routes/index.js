import funkoPopRoutes from './funkoPopRoutes.js';
import categoriaFunkoRoutes from './categoriaFunkoRoutes.js';
import userRouter from './usersRouter.js';

export default function routerAPI(app) {
  // Configuración de las rutas de la API
  app.use('/api/funkos', funkoPopRoutes);         // Ruta para los Funkos
  app.use('/api/categorias', categoriaFunkoRoutes); // Ruta para las Categorías
  app.use('/api/users', userRouter);              // Ruta para los Usuarios
}
