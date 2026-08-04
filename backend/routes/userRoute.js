import { Router } from 'express'
import { loginUser, registerUser } from '../controller/userConroller.js'

const userRoute = Router()

userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)