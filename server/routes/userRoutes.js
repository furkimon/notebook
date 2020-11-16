import express from 'express'
import { getUsers, register } from '../controls/userControls.js'

const router = express.Router()

router.get('/', getUsers)
router.post('/', register)

export default router