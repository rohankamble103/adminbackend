// import { Request, Response, NextFunction } from 'express';
// import * as dotenv from 'dotenv';
// import * as jwt from 'jsonwebtoken';

// dotenv.config();

// const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   console.log(JSON.stringify(req.headers), 'token', token);

//   if (!token) {
//     return res.status(403).send('A token is required for authentication');
//   }

//   try {
//     const decoded: any = jwt.verify(token, process.env.SECRET_KEY || '');
//     console.log(decoded, 'decoded');
//     req.user_login = decoded; // Update to req.user_login
//   } catch (err) {
//     console.log('error', err);
//     return res.status(401).send('Invalid Token');
//   }

//   return next();
// };

// export default verifyToken;
