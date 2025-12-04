import {Router} from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { generateSummary } from '../controllers/ai.controller.js';
const router = Router();


router.route('/summary').post(verifyJWT, generateSummary);

export default router;


