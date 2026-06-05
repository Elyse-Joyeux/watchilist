import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/generateToken.js'
import { dbState } from '../config/dbState.js'

const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password)
        return res.status(400).json({ message: "Please fill out all the fields" })

    const normalizedEmail = email.toLowerCase()

    // Check if running in mock database mode
    if (dbState.isMock) {
        const userExists = dbState.users.find(u => u.email.toLowerCase() === normalizedEmail)
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = {
            id: `u_${Date.now()}`,
            name,
            email: normalizedEmail,
            password: hashedPassword
        }
        dbState.users.push(user)
        const token = generateToken(user.id, res)

        return res.status(201).json({
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

    // Standard database path
    const userExists = await User.findOne({ email: normalizedEmail })

    if (userExists)
        return res.status(400).json({ message: "User already exists" })

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email: normalizedEmail,
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
    const normalizedEmail = email?.toLowerCase()

    // validate input
    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        })
    }

    // Check if running in mock database mode
    if (dbState.isMock) {
        const user = dbState.users.find(u => u.email.toLowerCase() === normalizedEmail)
        if (!user) {
            return res.status(400).json({
                error: "Invalid email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }

        const token = generateToken(user.id, res)
        return res.status(200).json({
            message: "Success",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }
            },
            token,
        })
    }

    // Standard database path
    const user = await User.findOne({ email: normalizedEmail })

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
                name: user.name,
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

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body
        const normalizedEmail = email?.toLowerCase()

        if (dbState.isMock) {
            const user = dbState.users.find(u => u.id === req.user.id)
            if (!user) return res.status(404).json({ error: "User not found" })
            if (normalizedEmail && dbState.users.some(u => u.id !== user.id && u.email === normalizedEmail)) {
                return res.status(400).json({ error: "Email is already in use" })
            }
            if (name) user.name = name
            if (normalizedEmail) user.email = normalizedEmail
            return res.status(200).json({
                message: "Profile updated successfully",
                user: { id: user.id, name: user.name, email: user.email }
            })
        }

        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        if (normalizedEmail) {
            const existing = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } })
            if (existing) return res.status(400).json({ error: "Email is already in use" })
        }
        if (name) user.name = name
        if (normalizedEmail) user.email = normalizedEmail
        await user.save()

        res.status(200).json({
            message: "Profile updated successfully",
            user: { id: user.id, name: user.name, email: user.email }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current and new password are required" })
        }

        if (dbState.isMock) {
            const user = dbState.users.find(u => u.id === req.user.id)
            if (!user) return res.status(404).json({ error: "User not found" })
            const isMatch = await bcrypt.compare(currentPassword, user.password)
            if (!isMatch) return res.status(400).json({ error: "Invalid current password" })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(newPassword, salt)
            return res.status(200).json({ message: "Password updated successfully" })
        }

        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ error: "User not found" })
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) return res.status(400).json({ error: "Invalid current password" })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        await user.save()

        res.status(200).json({ message: "Password updated successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export { register, login, logout, updateProfile, updatePassword }
