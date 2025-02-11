import { Router } from 'express';
import UserController from '../controllers/UserController';
import authenticate from '../middlewares/authenticate';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', authenticate(["listar_user"]), userController.getAll);
userRoutes.get('/:id', authenticate(["listar_user"]), userController.getById);
userRoutes.post('/', authenticate(["criar_user"]), userController.create);
userRoutes.put('/:id', authenticate(["atualizar_user"]), userController.update);
userRoutes.delete('/:id', authenticate(["remover_user"]), userController.delete);

export default userRoutes;
