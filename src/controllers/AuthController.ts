import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import User from '../entities/User';

export interface TokenPayload {
  email: string;
  name: string;
  userId: number;
  roles: string;
}
class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          email,
        },
        relations: ['roles', 'roles.permissions'],
      });

      if (!user) {
        res.status(400).json({ message: 'Usuário não encontrado' });
        return;
      }

      const senhaValida = await bcrypt.compare(password, user.password);

      if (senhaValida) {
        const payload = {
          email: user.email,
          name: user.name,
          userId: user.id,
          roles: JSON.stringify(user.roles),
        } as TokenPayload;

        if (!process.env.JWT_SECRET) {
          throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });

        res.status(200).json({ message: 'Usuário autenticado', token: token });
        return;
      } else {
        res.status(400).json({ message: 'Senha incorreta' });
        return;
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao fazer login', error: error.message });
    }
  }
}

export default AuthController;
