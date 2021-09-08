import { Router } from 'express';
import { userController } from '../controller';

const router = Router();

router.get('/users', (...args) => userController.users(...args));
router.get('/users/:id', (...args) => userController.user(...args));
router.post('/createUser', (...args) => userController.createUser(...args));
router.put('/updateUser/:id', (...args) => userController.updateUser(...args));
router.delete('/deleteUser', (...args) => userController.deleteUser(...args));

export default router;
