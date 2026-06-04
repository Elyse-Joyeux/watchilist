import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

// read the token from the request
//check if token is valid
export const authMiddleware = async(req, res) =>{
    console.log("Auth middleware reached")

}