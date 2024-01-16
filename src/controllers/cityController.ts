import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../utils/error_validation';
import { logger } from '../middleware/requestLogger';
import { cityModel } from '../models/cityModel';

export const getCities = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const cityResult = await cityModel.getCities();
        return res.status(200).json({ result: cityResult });
    } catch (err: any) {
        logger.info('error', { message: err });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};