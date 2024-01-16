import { Request, Response, NextFunction } from 'express';
import winston from 'winston';
import {format} from "date-fns";

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, statusCode }) => {
    return `[${timestamp}] [${level}] Status: ${statusCode} - ${message}`;
});

export const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), logFormat),
    transports: [
        new winston.transports.File({ filename: `src/logs/request_logs_${format(new Date(), 'yyyy_MM_dd')}.log`}) // Log to a file named 'logs.log'
    ]
});

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = new Date();
    const logMessage = `${req.method} ${req.url}`;
    const clientIp = req.ip || req.connection.remoteAddress;

    res.on('finish', () => {
        // @ts-ignore
        const responseTime = new Date() - startTime;
        const logData = { ip: clientIp, statusCode: res.statusCode, responseTime };

        // Log the response status code
        logger.info(logMessage, logData);

        // Log an error if the response status code indicates an error (4xx or 5xx)
        if (res.statusCode >= 400) {
            logger.error(`Error: ${logMessage}`, logData);
        }
    });

    next();
};

