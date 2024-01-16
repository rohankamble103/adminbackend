import { Router } from "express"
import { validateFields } from '../middleware/commonValidator';
import { getSectors } from "../controllers/sectorController";

const sectorRouter = Router();

sectorRouter.get('/sectors', getSectors);

export default sectorRouter;