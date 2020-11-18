import mongoose from 'mongoose'
import NoteModel from '../models/noteModel.js'

export const getNotesForUser = async (req, res) => {
    try {
        const {userID : userID} = req.params
        const notes = await NoteModel.find()
        const visibleNotes = notes.filter((note) => note.createdBy !== userID)
        res.status(200).json(visibleNotes)
        console.log(visibleNotes)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find()
        res.status(200).json(notes)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const filterNotes = async (req, res) => {
    try {
        const { item : item } = req.params
        const notes = await NoteModel.find()
        var filteredNotes = notes.filter((note) => note.category.includes(item))
        res.status(200).json(filteredNotes)
    } catch (error) {
        res.status(404).json({message : error})
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, content, category, createdBy} = req.body
        const holdNote = {title, content, category, createdBy}
        const newNote = new NoteModel(holdNote)

        await newNote.save()
        res.status(201).json(newNote)
    } catch (error) {
        res.status(409).json({ message: error })
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