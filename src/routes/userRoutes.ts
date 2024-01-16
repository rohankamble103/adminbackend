import { Router } from "express"
import { Register, Login } from '../controllers/userController';
import { validateFields } from '../middleware/commonValidator';

const router = Router();

router.post('/login', [...validateFields(['username', 'password'])], Login);
router.post("/register", [...validateFields(['username', 'email', 'password', 'contact_name', 'role_id'])], Register);

export default router;