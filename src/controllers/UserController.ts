import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../database/data-source';
import User from '../entities/User';

class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await AppDataSource.getRepository(User).find({
        where: { active: true },
      });

      res.status(200).json(users);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar usuários', error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id, active: true },
      });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar usuário', error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);

      if (!name || !email || !password) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User();
      user.name = name;
      user.email = email;
      user.password = hashedPassword;
      user.created_at = new Date();
      user.updated_at = new Date();

      const savedUser = await AppDataSource.getRepository(User).save(user);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao criar usuário', error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const body = req.body;

      if (body.id) {
        res.status(400).json({ message: 'Não é permitido atualizar o ID' });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      Object.assign(user, body);
      user.updated_at = new Date();

      const updatedUser = await userRepository.save(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deleteResult = await AppDataSource.getRepository(User).delete(id);

      if (deleteResult.affected === 0) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao excluir usuário', error: error.message });
    }
  }

  async disable(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      user.active = !user.active;

      const updatedUser = await userRepository.save(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao desativar usuário', error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await AppDataSource.getRepository(User).findOne({
        where: { email },
      });

      if (!user) {
        res.status(400).json({ message: 'Usuário não encontrado' });
        return;
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        res.status(200).json({ message: 'Usuário autenticado' });
      } else {
        res.status(400).json({ message: 'Senha incorreta' });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao autenticar usuário', error: error.message });
    }
  }
}

export default UserController;
