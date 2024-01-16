import { Request as ExpressRequest, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

interface DecodedToken {
  
  id: string;
  username:string;
  password:string;
  email:string;
  contact_name:string;
  role_id:number
}

// Extend the Request type to include a 'user' property
interface RequestWithUser extends ExpressRequest {
  user?: DecodedToken;
}

const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const tokenHeader = req.headers.authorization;
  
  if (!tokenHeader) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = tokenHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as DecodedToken;
    req.user = decoded;
  } catch (err) {
    console.log("error", err);
    return res.status(401).send("Invalid Token");
  }

  return next();
};

export default verifyToken;
