import { getTodayStats } from '../controllers/stats.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { Router } from 'express'


const router = Router();

router.route('/today').get(verifyJWT, getTodayStats);

export default router;