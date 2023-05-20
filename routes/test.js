import express from 'express'
import { testPostController } from '../controllers/test.js';
import { userAuth } from '../middlewares/authmiddleware.js';

const router = express.Router()

router.post('/test-post', userAuth, testPostController)

export default router;