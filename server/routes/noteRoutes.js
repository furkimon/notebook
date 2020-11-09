import express from 'express'

import { getNotes, createNote, updateNote, deleteNote, filterNotes } from '../controls/noteControls.js'

const router = express.Router()

router.get('/', getNotes)
router.post('/', createNote)
router.post('/:id', updateNote)
router.delete('/:id', deleteNote)
router.get('/category/:item', filterNotes)

export default router