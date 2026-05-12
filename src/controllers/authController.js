import User from '../models/User.js'
import bcrypt from 'bcryptjs'
const register = async (req, res)=>{
    const body = req.body;
    const {name, email, password} = req.body;
    

    //check if user already exists
   const userExists = await User.findOne({email})

    if(userExists)
        return res.status(400).json({message: "User already exists"})
    

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({ name, email, password: hashedPassword})
    res.status(201).json({message: "Success",
        data : {
            user: {
                id: user.id,
                name: name,
                email: email,
            }
        }
        })
    }


export {register} 