import { combineReducers } from 'redux'

import { postReducer } from './posts'
import { authReducer } from './auth'

// COMBINED REDUCERS
const reducers = {
	auth: authReducer,
	posts: postReducer
}

export default combineReducers(reducers)
