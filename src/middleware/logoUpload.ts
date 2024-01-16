import { Request } from 'express';
import multer, { StorageEngine, FileFilterCallback } from 'multer';
import moment from 'moment';
import 'moment';

const current_date: string = moment().format('YYYY-MM-DD');

export const fileStorage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'logos/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, current_date + '-' + file.originalname);
  }
});

export const fileFilter: any = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void): void => {
    // Check if the file has an allowed extension for images
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Please upload a valid image file (JPG, JPEG, PNG, GIF)'), false);
    }
  };
const upload = multer({ storage: fileStorage, fileFilter: fileFilter});

export default upload;
