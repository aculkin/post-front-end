import { combineReducers } from 'redux'

// import { userReducer } from './user'
import { authReducer } from './auth'

// COMBINED REDUCERS
const reducers = {
	auth: authReducer
}

export default combineReducers(reducers)
