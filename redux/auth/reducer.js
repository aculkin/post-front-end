import * as types from './types'

const initialAuthState = {
	token: null,
	isAuthenticated: false,
	user: null
}

if (typeof window !== 'undefined') {
	let authToken = window.localStorage.getItem('token') || null
	if (authToken) {
		initialAuthState.token = authToken
		initialAuthState.isAuthenticated = true
	}
	initialAuthState.user = window.localStorage.getItem('user') || null
}

export const authReducer = (state = initialAuthState, { type, payload }) => {
	switch (type) {
		case types.LOGIN:
			return { ...state, token: payload, isAuthenticated: true }
		case types.SIGNUP:
		case types.ME:
			return { ...state, user: payload }
		case types.LOGOUT:
			return { token: null, isAuthenticated: false, user: null }
		default:
			return state
	}
}
