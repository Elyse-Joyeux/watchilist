import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../utils/generateToken.js'

const register = async (req, res)=>{
    const body = req.body;
    const {name, email, password} = req.body;
    if(!name || !email || !password) 
        return res.status(400).json({message: "Please fill out all the fields"})
    

    //check if user already exists
   const userExists = await User.findOne({email})

    if(userExists)
        return res.status(400).json({message: "User already exists"})
    

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({ name, email, password: hashedPassword})

    //generate jwt token
    const token = generateToken(user.id, res)
    res.status(201).json({message: "Success",
        data : {
            user: {
                id: user.id,
                name: name,
                email: email,
            }
        }, token
        })
    }

const login = async(req, res)=>{
    const {email, password} = req.body

    //check if user exists/email
    const user = await User.findOne({email})

    if(!user){
        return res.status(400).json({error: "Invalid email or password"})
    }

    //veify if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid)
        return res.status(401).json({error: "Invalid email or password"})

    //generate jwt tokens
    const token = generateToken(user.id, res)

    res.status(201).json({message: "Success",
        data : {
            user: {
                id: user.id,
                email: email,
            }
        }, token,
        })
}

const logout = async(req, res)=>{
    res.cookie("jwt", "",{
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({
        status: "success",
        message: "Logget out successfully"
    })

}

export {register, login, logout} 