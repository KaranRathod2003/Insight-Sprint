import {Router} from 'express';
import { getWeeklyMood, logMood } from '../controllers/mood.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router();

router.route('/').post(verifyJWT,logMood);

router.route('/weekly').get(verifyJWT, getWeeklyMood);

export default router;