import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
    title : String,
    content : String,
    category : [String],
    createdAt : {
        type : Date,
        default: new Date()
    },
    createdBy: {
        type : String,
        required: true
    }
})

const NoteModel = mongoose.model('NoteModel', noteSchema)

export default NoteModel