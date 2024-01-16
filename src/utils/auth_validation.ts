import { body,validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';



const containsAlphabet = (value: string): boolean => {
    return /[a-zA-Z]/.test(value);
  };
 const containsNumber = (value:string):boolean =>{
    return /\d/.test(value);
 };
 const containsSpecialCharacter = (value: string): boolean => {
  return /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value);
};
export const validateUsernamePasswordError= (req:Request, res:Response, next:NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ error: 'Validation failed.', data: errorMessages });
  }

  next();
};


export const validateUsernamePassword = [
  body('username', 'Username is required').trim().notEmpty(),
  body('password', 'Password is required').trim().notEmpty()
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
  .custom((value: string) => containsAlphabet(value))
    .withMessage('Password must contain at least one alphabet character.')
    .custom((value: string) => containsNumber(value))
    .withMessage('Password must contain at least one number character.')
    .custom((value:string)=> containsSpecialCharacter(value))
    .withMessage('Password must contain at least one special character.')
];
