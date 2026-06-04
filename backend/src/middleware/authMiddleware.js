import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'

// read the token from the request
//check if token is valid
export const authMiddleware = async(req, res, next) =>{
    console.log("Auth middleware reached")
    let token;


    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1] // ["Bearer", "token"]) 
    }else if(req.cookies?.jwt){
        token = req.cookies.jwt
    }
    if(!token)
        return res.status(401).json({error: "Unauthorized"})

    try{
        //verify if token is valid and extract userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await mongoose.user.findOne({id: decoded.id})

        if(!user)
            return res.status(401).json({error: "Unauthorized"})

        req.user = user
        next()
    }catch(err){
        return res.status(401).json({error: "Unauthorized"})
    
    }
}