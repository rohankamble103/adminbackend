import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../utils/error_validation';
import { logger } from '../middleware/requestLogger';
import { sectorModel } from '../models/sectorModel';

export const getSectors = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const sectorResult = await sectorModel.getSectors();
        return res.status(200).json({ result: sectorResult });
    } catch (err: any) {
        logger.info('error', { message: err });
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};