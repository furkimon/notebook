import {combineReducers} from 'redux'

import notes from './notesReducer'
import auth from './authReducer'
import error from './errorReducer'
import user from './userReducer'

export default combineReducers({notes, auth, error, user})