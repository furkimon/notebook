import UserModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    await UserModel.findById(req.user.id)
        .select('-password')  // leave the password
        .then(user => res.json(user))
}

export const authUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'enter all fields' })
    }

    await UserModel.findOne({ email })
        .then(user => {
            if (!user) res.status(400).json({ message: 'user does not exist' })

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

                    jwt.sign(  // auth is stateless for jwt!
                        { id: user.id },
                        process.env.jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
}