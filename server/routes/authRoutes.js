import express from 'express'
import {auth} from '../middleware/authMiddleware.js'
import { authUser, getUser} from '../controls/authControls.js'

const router = express.Router()

router.get('/user', auth, getUser)
router.post('/', authUser)

export default router