import express from 'express'
import { auth } from '../middleware/authMiddleware.js'

import { getNotes, getNotesForUser, createNote, updateNote, deleteNote, filterNotes } from '../controls/noteControls.js'

const router = express.Router()

router.get('/', auth, getNotes)
router.get('/:user', auth, getNotesForUser)
router.post('/', auth,  createNote)
router.post('/:id', auth, updateNote)
router.delete('/:id', auth, deleteNote)
router.get('/category/:item', auth, filterNotes)

export default router