import UserModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const followUser = async (req, res) => {

    const { id: _id } = req.params      // followed user's id as "id" 
    const { follower } = req.body      // and the current user as "followers"

    if (!follower) {
        return res.status(400).json({ message: 'enter followers' })
    }

    const currentUser = await UserModel.findById(follower)
    const userToFollow = await UserModel.findById(_id)

    if (userToFollow.followers.includes(follower)) {

        userToFollow.followers.splice(userToFollow.followers.indexOf(follower), 1)
        userToFollow.save()
        
        .then(
            currentUser.following.splice(currentUser.following.indexOf(_id), 1),
            currentUser.save()
                    .then(res.json({ unfollowed: userToFollow, unfollower: currentUser }))
            )
            .catch(error => res.status(400).json({ message: error }))
    } else {
        currentUser.following.push(_id)

        currentUser.save()
            .then(
                userToFollow.followers.push(follower),
                userToFollow.save()
                    .then(res.json({ followed: userToFollow, follower: currentUser }))
            )
            .catch(error => res.status(400).json({ message: error }))
    }
}


export const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'enter all fields' })
    }

    await UserModel.findOne({ email })
        .then(user => { if (user) res.status(400).json({ message: 'user exists' }) })

    const newUser = new UserModel({ name, email, password })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser.save()
                .then(user => {

                    jwt.sign(
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
    })
}