import express from 'express'
import { createUser } from '../controls/userControls.js'

const router = express.Router()

// router.get('/', getUsers)
router.post('/', createUser)

export default router