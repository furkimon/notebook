import UserModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({message : error})
    }
}


export const register = async (req, res) => {
    const { name, email, password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({message : 'enter all fields'})
    }

    await UserModel.findOne({email})
    .then(user => {if(user) res.status(400).json({message : 'user exists'})})

    const newUser = new UserModel({name, email, password})

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err
            newUser.password = hash

            newUser.save()
            .then(user => {

                jwt.sign(
                    {id : user.id},
                    process.env.jwtSecret,
                    {expiresIn : 3600},
                    (err, token) => {
                        if(err) throw err
                        res.json({
                            token,
                            user : {
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