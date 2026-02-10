import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUser, loginUser } from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../../../nodejs-basics/src/validations/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

export default router;
