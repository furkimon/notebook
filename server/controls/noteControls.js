import mongoose from 'mongoose'
import NoteModel from '../models/noteModel.js'
import UserModel from '../models/userModel.js'

export const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find()
        res.status(200).json(notes)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getNotesForUser = async (req, res) => {
    try {
        const {id : _id} = req.params

        const notes = await NoteModel.find()
        const visibleNotes = notes.filter((note) => note.createdBy === _id)

        res.status(200).json(visibleNotes)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getFollowedNotes = async (req, res) => {
    try {
        const {id : _id} = req.params
        const user = await UserModel.findById(_id)
        const notes = await NoteModel.find()

        const followedNotes = notes.filter((note) => user.following.includes(note.createdBy) || note.createdBy === _id)

        res.status(200).json(followedNotes)

    } catch (error) {
        res.status(400).json({message : error})
    }
}

export const filterNotes = async (req, res) => {
    try {
        const { id, item } = req.params
        const notes = await NoteModel.find()   

        var filteredNotes = notes.filter((note) => note.category.includes(item) && note.createdBy === id )
        res.status(200).json(filteredNotes)
    } catch (error) {
        res.status(404).json({message : error})
    }
}

export const filterTimeline = async (req, res) => {
    try {
        const { id, item } = req.params
        const notes = await NoteModel.find()   
        const user = await UserModel.findById(id)   

        var filteredNotes = notes.filter((note) => user.following.includes(note.createdBy) && note.category.includes(item) )
        res.status(200).json(filteredNotes)
    } catch (error) {
        res.status(404).json({message : error})
    }
}

export const createNote = async (req, res) => {
    try {
        const {id: _id} = req.params
        const {title, content, category} = req.body
        const holdNote = {title, content, category, createdBy : _id}
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