import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createTask, deleteTask, getTodayTasks, toggleTask } from '../controllers/task.controller.js';

const router = Router();

router.route('/').post(verifyJWT, createTask);

router.route('/today').get(verifyJWT, getTodayTasks);

router.route('/:id').patch(verifyJWT, toggleTask);

router.route('/:id').delete(verifyJWT, deleteTask);




export default router