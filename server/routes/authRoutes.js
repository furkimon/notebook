import express from 'express'
import {auth} from '../middleware/authMiddleware.js'
import { login, loadUser} from '../controls/authControls.js'

const router = express.Router()

router.get('/user', auth, loadUser)
router.post('/', login)

export default router