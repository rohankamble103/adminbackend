
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import {RequestValidationError} from '../utils/error_validation';
import { UserModel } from '../models/userModel';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { logger } from '../middleware/requestLogger';
dotenv.config();


export const Login = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationError = new RequestValidationError('Validation failed.', 422, errors.array());
    return next(validationError);
  }

  const { username, password } = req.body;
  try {
    const userResult = await UserModel.findUsername(username) as { status: string; data: any[] };
    const user = userResult.data?.[0]; 
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
   
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    const token = jwt.sign({ userId: user.user_id, username: user.username ,role_id:user.role_id}, process.env.SECRET_KEY as string, {
      expiresIn: process.env.JWT_EXPIRATION
    });
    return res.status(200).json({ message: 'Successfully logged in', token});
  } catch (err: any) {
    logger.info('error', { message: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


export const Register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = new RequestValidationError('Validation failed.', 422, errors.array());
    return next(validationError);
  }
  const { username, password, email, contact_name,role_id } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result:any = await UserModel.createUser(username, hashedPassword, email, contact_name,role_id);
    if (result.status == 'success') {
      return res.status(201).json({ message: 'User Created Successfully' });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (err:any) {
    logger.info('error', { message: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};