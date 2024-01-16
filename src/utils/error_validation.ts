import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
    statusCode: number;
    data: ValidationError[];
  
    constructor(message: string, statusCode: number, data: ValidationError[]) {
      super(message);
      this.statusCode = statusCode;
      this.data = data;
    }

    
  }
    
  