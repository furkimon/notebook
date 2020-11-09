import mongoose from 'mongoose'
import NoteModel from '../models/noteModel.js'

export const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find()
        console.log(notes)
        res.status(200).json(notes)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createNote = async (req, res) => {
    try {
        const note = req.body
        const newNote = new NoteModel(note)
        await newNote.save()
        res.status(201).json('Creation was successfull')
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const updateNote = async (req, res) => {
    const {id : _id} = req.params
    const note = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No note for that id')
    }
    const updatedNote = await NoteModel.findByIdAndUpdate(_id, {...note, note},  {new : true})

    res.json(updatedNote)
}

export const deleteNote = async (req, res) => {

    const { id :_id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No notes for that id')
    }

    await NoteModel.findByIdAndDelete(_id)

    res.json({ message: 'Note deleted succesfully' })

}