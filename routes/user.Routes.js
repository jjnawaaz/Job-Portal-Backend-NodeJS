import express from 'express'
import { userAuth } from '../middlewares/authmiddleware.js'
import { updateUser } from '../controllers/userController.js'

//router object 
const router = express.Router()

//Routes
router.put('/update-user', userAuth, updateUser)

export default router
