import {Router} from 'express';
import { getProfile, login, logout, refreshAccessToken, register } from '../controllers/auth.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();


router.route('/register').post(register);
router.route('/login').post(login);


router.route('/logout').post(verifyJWT, logout);


router.route('/refresh').post(refreshAccessToken);
router.route('/profile').get( verifyJWT, getProfile);


export default router ;
