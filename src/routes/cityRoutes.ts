import { Router } from "express"
import { validateFields } from '../middleware/commonValidator';
import { getCities } from "../controllers/cityController";

const cityRouter = Router();

cityRouter.get('/cities', getCities);

export default cityRouter;