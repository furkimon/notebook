import express from 'express'
import { getUsers, followUser, register } from '../controls/userControls.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/:id', followUser)
router.post('/', register)

export default router