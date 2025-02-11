require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import userRoutes from './routes/user.routes';
import medicamentoRoutes from './routes/medicamento.routes';
import rbacRoutes from './routes/rbac.routes';
import Role from './entities/Role';
import Permission from './entities/Permission';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());

app.use(express.json());

AppDataSource.initialize()
  .then(async () => {
    console.log('Sua conexão com banco de dados está ok');
  })
  .catch(error => {
    console.error(error);
  });

app.use('/users', userRoutes);
app.use('/medicamentos', medicamentoRoutes);
app.use('/rbac', rbacRoutes);
app.use('/login', authRoutes);

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
