import validator from 'validator'
import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_EXPIRES = '24h'

const createToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES })
}

// register user

const registerUser = async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: " All fields are required."
        })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Email is not valid"
        })
    }
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be atleast 8 characters"
        })
    }

    try {

        if (await User.findOne({ email })) {
            return res.status(409).json({
                success: false,
                message: "User already present"
            })
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashed })

        const token = createToken(user._id)

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })


    }

}