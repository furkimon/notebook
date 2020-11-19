import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
    // followers : {
    //     type: String,
    //     unique: true
    // }

})

const UserModel = mongoose.model('UserModel', userSchema)

export default UserModel