import { Router } from 'express'
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from '../controller/userConroller.js'
import authMiddleware from '../middleware/auth.js'

const userRoute = Router()

userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)

// protected routes 
userRoute.get("/me", authMiddleware, getCurrentUser)
userRoute.put("/profiles", authMiddleware, updateProfile)
userRoute.put("/password", authMiddleware, updatePassword)

export default userRoute
