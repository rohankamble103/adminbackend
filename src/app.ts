
import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import axios from 'axios';
import cors from 'cors';
import {requestLogger} from "./middleware/requestLogger";
import {json,urlencoded} from "body-parser";
import  router  from './routes/userRoutes';
import  cityRouter  from './routes/cityRoutes';
import  sectorRouter  from './routes/sectorRoutes';
import { RequestValidationError } from './utils/error_validation';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use ("/users", router);
app.use ("/city", cityRouter);
app.use ("/sector", sectorRouter);

const port = process.env.NODE_SERVER_PORT | 3000;

app.use(requestLogger);
//http response headers
app.disable('x-powered-by');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Permissions-Policy', 'none');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('X-Frame-Options', 'cross-origin');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    res.setHeader('X-Permitted-Cross-Domain-Policies', 'all');
    res.setHeader('X-XSS-Protection', '1');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('Content-Security-Policy', `default-src 'self'`);
    next();
});

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["platform", "content-type", "Authorization"]
}));

app.get('/', async (req, res) => {
  const response = await axios.get('https://api64.ipify.org?format=json');
  const clientIp = response.data.ip;
  console.log(response.data)
  res.send('Hello World!');
});

// Error handling middleware
app.use((error: RequestValidationError, req: Request, res: Response, next:NextFunction) => {
  return res.status(error.statusCode || 500).json({ error: error.message, data: error.data });
});

app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});
