import { Router } from 'express';
import MedicamentoController from '../controllers/MedicamentoController';
import authenticate from '../middlewares/authenticate';

const medicamentoRoutes = Router();
const medicamentoController = new MedicamentoController();

medicamentoRoutes.get('/', authenticate, medicamentoController.getAll);
medicamentoRoutes.get('/:id', authenticate, medicamentoController.getById);
medicamentoRoutes.post('/', authenticate, medicamentoController.create);
medicamentoRoutes.put('/:id', authenticate, medicamentoController.update);
medicamentoRoutes.delete('/:id', authenticate, medicamentoController.delete);

export default medicamentoRoutes;
