import * as types from './types'

const initialAuthState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	// isLoading: false,
	user: null
}

export const authReducer = (state = initialUserState, { type, payload }) => {
	switch (type) {
		case types.GET_AUTH_TOKEN:
			return { ...state, token: payload }
		case types.SIGNUP:
		case types.LOGIN:
		case types.ME:
			return { ...state, isAuthenticated: true, user: payload }
		case types.LOGOUT:
			return initialAuthState
		default:
			return state
	}
}
