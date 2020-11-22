import express from 'express'
import { auth } from '../middleware/authMiddleware.js'

import { getNotes, getNotesForUser, getFollowedNotes, createNote, updateNote, deleteNote, filterNotes } from '../controls/noteControls.js'

const router = express.Router()

router.get('/', getNotes)
router.get('/createdBy/:id', auth, getNotesForUser)
router.get('/:id/followed', auth, getFollowedNotes)
router.post('/', auth,  createNote)
router.post('/:id', updateNote)
router.delete('/:id', auth, deleteNote)
router.get('/createdBy/:id/category/:item', auth, filterNotes)

export default router