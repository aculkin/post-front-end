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
	let userObject = window.localStorage.getItem('user') || null
	if (userObject) {
		initialAuthState.user = JSON.parse(userObject)
	}
}

export const authReducer = (state = initialAuthState, { type, payload }) => {
	switch (type) {
		case types.LOGIN:
		case types.SIGNUP:
			return {
				...state,
				token: payload?.token,
				isAuthenticated: !!payload?.token,
				user: payload?.user
			}
		case types.EDIT_USER_DETAILS:
		case types.ME:
			return { ...state, user: payload }
		case types.LOGOUT:
			return { token: null, isAuthenticated: false, user: null }
		default:
			return state
	}
}
