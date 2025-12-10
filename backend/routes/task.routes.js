import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createTask, deleteTask, getTodayTasks, toggleTask, updateTask } from '../controllers/task.controller.js';

const router = Router();

router.route('/').post(verifyJWT, createTask);

router.route('/today').get(verifyJWT, getTodayTasks);

router.route('/:id')
    .patch(verifyJWT, toggleTask)  // toggle complete
    .put(verifyJWT, updateTask)    // edit title/description
    .delete(verifyJWT, deleteTask);




export default router