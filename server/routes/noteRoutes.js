import express from 'express'
import { auth } from '../middleware/authMiddleware.js'

import { getNotes, getNotesForUser, createNote, updateNote, deleteNote, filterNotes } from '../controls/noteControls.js'

const router = express.Router()

router.get('/', getNotes)
router.get('/createdBy/:userID', auth, getNotesForUser)
router.post('/', auth,  createNote)
router.post('/:id', updateNote)
router.delete('/:id', auth, deleteNote)
router.get('/createdBy/:userID/category/:item', auth, filterNotes)

export default router