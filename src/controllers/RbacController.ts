import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import Permission from '../entities/Permission';
import Role from '../entities/Role';
import User from '../entities/User';

export default class RbacController {
  async listPermissions(req: Request, res: Response): Promise<void> {
    try {
      const permissionRepository = AppDataSource.getRepository(Permission);
      const permissions = await permissionRepository.find();
      res.status(200).json(permissions);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro ao listar as permissões',
        error: error.message,
      });
    }
  }

  async createOnePermission(req: Request, res: Response): Promise<void> {
    try {
      const permissionBody = req.body as Permission;

      if (!permissionBody.description) {
        res.status(400).json({
          message: 'Descrição da permissão é obrigatória',
        });
        return;
      }
      await AppDataSource.getRepository(Permission).save(permissionBody);
      res.status(201).json(permissionBody);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro ao criar a permissão',
        error: error.message,
      });
    }
  }

  async listRoles(req: Request, res: Response): Promise<void> {
    try {
      const roleRepository = AppDataSource.getRepository(Role);
      const roles = await roleRepository.find();
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro ao listar os papéis',
        error: error.message,
      });
    }
  }

  async createOneRole(req: Request, res: Response): Promise<void> {
    try {
      const roleBody = req.body as Role;

      if (!roleBody.description) {
        res.status(400).json({
          message: 'Descrição do papel é obrigatória',
        });
        return;
      }
      await AppDataSource.getRepository(Role).save(roleBody);
      res.status(201).json(roleBody);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro ao criar a descrição',
        error: error.message,
      });
    }
  }

  async listPermissionsByRole(req: Request, res: Response): Promise<void> {
    try {
      const roleRepository = AppDataSource.getRepository(Role);
      const roles = await roleRepository.find({
        relations: ['permissions'],
      });
      if (!roles) {
        res.status(404).json({
          message: 'Papel não encontrado',
        });
        return;
      }
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro ao listar as permissões do papel',
        error: error.message,
      });
    }
  }

  async addPermissionToRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleId, permissionId } = req.body as {
        roleId: number;
        permissionId: number;
      };
      const roleRepository = AppDataSource.getRepository(Role);
      const permissionRepository = AppDataSource.getRepository(Permission);

      const role = await roleRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      });
      const permission = await permissionRepository.findOneBy({
        id: permissionId,
      });

      if (!role || !permission) {
        res.status(404).json({
          message: 'Papel ou permissão não encontrados',
        });
        return;
      }

      if (!role.permissions) {
        role.permissions = [];
      }

      role.permissions.push(permission);
      await roleRepository.save(role);
      res.status(200).json(role);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro ao adicionar permissão ao papel',
        error: error.message,
      });
    }
  }

  async addRoleToUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId, roleId } = req.body as {
        userId: number;
        roleId: number;
      };
      const userRepository = AppDataSource.getRepository(User);
      const roleRepository = AppDataSource.getRepository(Role);

      const user = await userRepository.findOne({
        where: { id: userId },
        relations: ['roles'],
      });
      const role = await roleRepository.findOne({
        where: { id: roleId },
        relations: ['permissions'],
      });

      if (!user || !role) {
        res.status(404).json({
          message: 'Usuário ou papel não encontrados',
        });
        return;
      }

      if (!user.roles) {
        user.roles = [];
      }

      if (role.permissions.find(permission => permission.id)) {
        res.status(400).json({
          message: 'Permissão já existe no papel',
        });
        return;
      }

      if (user.roles.find(userRole => userRole.id == role.id)) {
        res.status(400).json({
          message: 'O usuário já possui esse papel',
        });
        return;
      }

      user.roles.push(role);
      await userRepository.save(user);
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({
        message: 'Erro ao adicionar papel ao usuário',
        error: error.message,
      });
    }
  }
}
