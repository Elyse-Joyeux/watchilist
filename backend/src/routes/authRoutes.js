import express from 'express'
import {register, login, logout, updateProfile, updatePassword} from '../controllers/authController.js'
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.put('/profile', authMiddleware, updateProfile)
router.put('/password', authMiddleware, updatePassword)

export default router