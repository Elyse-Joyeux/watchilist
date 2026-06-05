import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../models/User.js'
import { dbState } from '../config/dbState.js'

// read the token from the request
//check if token is valid
export const authMiddleware = async(req, res, next) =>{
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
        let user;
        if (dbState.isMock) {
            user = dbState.users.find(u => u.id === decoded.id)
        } else {
            user = await User.findById(decoded.id)
        }

        if(!user)
            return res.status(401).json({error: "Unauthorized"})

        req.user = user
        next()
    }catch(err){
        return res.status(401).json({error: "Unauthorized"})
    
    }
}
