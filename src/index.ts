import 'reflect-metadata';
import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import cors from 'cors';

import { AppDataSource } from './database/data-source';
import userRoutes from './routes/user.routes';

const app = express();

app.use(cors());

app.use(express.json());

// Uso do Middleware global
/*app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware global');
  next();
});*/

AppDataSource.initialize()
  .then(async () => {
    console.log('Sua conexão com banco de dados está ok');
  })
  .catch(() => console.log('Erro ao conectar com o banco de dados'));

app.use('/users', userRoutes);

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});
