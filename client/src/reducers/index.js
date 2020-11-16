import {combineReducers} from 'redux'

import notes from './notesReducer'
import auth from './authReducer'
import error from './errorReducer'

export default combineReducers({notes, auth, error})