import { Router } from 'express'
import { createHabit, deleteHabit, getTodayHabits, toggleHabit } from '../controllers/habit.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'


const router = Router();

// create 
router.route('/').post(verifyJWT, createHabit);
router.route('/today').get(verifyJWT, getTodayHabits);
router.route('/:id').patch(verifyJWT, toggleHabit);
router.route('/:id').delete(verifyJWT, deleteHabit);

export default router;