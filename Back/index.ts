import dotenv from 'dotenv';
dotenv.config();

import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cartRoutes from './routes/carrito';

const server = new Server();

server.app.use(cors({ origin: '*' }));

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use('/user', userRoutes);
server.app.use('/carrito', cartRoutes);

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error('MONGO_URL no está definido en las variables de entorno');
}

mongoose.connect(mongoUrl, {
})
.then(() => {
  console.log('Base de datos ONLINE');
})
.catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

server.start(() => {
  console.log(`Servidor corriendo en puerto ${server.port}`);
});