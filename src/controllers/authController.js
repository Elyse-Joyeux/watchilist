import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'

const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password)
        return res.status(400).json({ message: "Please fill out all the fields" })

    // check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists)
        return res.status(400).json({ message: "User already exists" })

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // generate jwt token
    const token = generateToken(user.id, res)

    res.status(201).json({
        message: "Success",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        },
        token
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    // validate input
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        })
    }

    // check if user exists/email
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({
            error: "Invalid email or password"
        })
    }

    // ensure password exists in database
    if (!user.password) {
        return res.status(500).json({
            error: "User password not found in database"
        })
    }

    // verify if password is correct
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    )

    if (!isPasswordValid)
        return res.status(401).json({
            error: "Invalid email or password"
        })

    // generate jwt token
    const token = generateToken(user.id, res)

    res.status(200).json({
        message: "Success",
        data: {
            user: {
                id: user.id,
                email: user.email,
            }
        },
        token,
    })
}

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    })

    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    })
}

export { register, login, logout }