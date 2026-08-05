import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = async (req, res, next) => {

    // grab the token 

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({
            success: false,
            message: " Not authorized or missing token"
        })
    }

    const token = authHeader.split(" ")[1]

    // to verfy the token 

    try {

        const paylaod = await jwt.verify(token, JWT_SECRET)
        const user = await User.findById(paylaod.id).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user
        next()

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Tokeninvallid"
        })


    }


}

export default authMiddleware