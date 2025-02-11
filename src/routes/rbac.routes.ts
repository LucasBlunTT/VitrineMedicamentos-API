import { Router } from 'express';
import RbacController from '../controllers/RbacController';
const rbacController = new RbacController();
const rbacRoutes = Router();

rbacRoutes.get('/listPermissions', rbacController.listPermissions);
rbacRoutes.post('/createOnePermission', rbacController.createOnePermission);
rbacRoutes.get('/listRoles', rbacController.listRoles);
rbacRoutes.post('/createOneRole', rbacController.createOneRole);
rbacRoutes.get('/listPermissionsByRole', rbacController.listPermissionsByRole);
rbacRoutes.post('/addPermissionToRole', rbacController.addPermissionToRole);
rbacRoutes.post('/addRoleToUser', rbacController.addRoleToUser);

export default rbacRoutes;
