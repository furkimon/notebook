import express from 'express'
import { getUsers, followUser, register, updateUser } from '../controls/userControls.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/:id', followUser)
router.post('/update/:id', updateUser)
router.post('/', register)

export default router