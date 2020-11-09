import express from 'express'

import { getNotes, createNote, updateNote, deleteNote } from '../controls/noteControls.js'

const router = express.Router()

router.get('/', getNotes)
router.post('/', createNote)
router.post('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router