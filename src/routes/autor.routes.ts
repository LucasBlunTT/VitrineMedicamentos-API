import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import User from '../entities/User';
import rotaAutenticada from '../middlewares/auth';
import bcrypt from 'bcrypt';

const userRoutes = Router();

userRoutes.get('/', rotaAutenticada, async (req, res) => {
  try {
    const users = await AppDataSource.getRepository(User).find();
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuários', error: error.message });
  }
});

userRoutes.get('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar usuário', error: error.message });
  }
});

userRoutes.post('/', rotaAutenticada, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = senhaCriptografada;

    const savedUser = await AppDataSource.getRepository(User).save(user);
    res.status(201).json(savedUser);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao criar usuário', error: error.message });
  }
});

userRoutes.put('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    const updatedUser = await userRepository.save(user);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao atualizar usuário', error: error.message });
  }
});

userRoutes.delete('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleteResult = await AppDataSource.getRepository(User).delete(id);

    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao excluir usuário', error: error.message });
  }
});

userRoutes.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AppDataSource.getRepository(User).findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(password, user.password);

    if (senhaValida) {
      return res.status(200).json({ message: 'Usuário autenticado' });
    } else {
      return res.status(400).json({ message: 'Senha incorreta' });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao autenticar usuário', error: error.message });
  }
});

export default userRoutes;
