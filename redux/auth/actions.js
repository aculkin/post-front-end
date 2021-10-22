import { LOGIN, LOGOUT, SIGNUP, ME } from './types'
import API from '../../API'

//user actions
export const signup = (payload) => ({ type: SIGNUP, payload })
export const login = (payload) => ({ type: LOGIN, payload })
export const logout = () => ({ type: LOGOUT })
export const me = (payload) => ({ type: ME, payload })

const localStorageWrapper = (action, key, value) => {
	if (typeof window !== 'undefined') {
		switch (action) {
			case 'get':
				return localStorage.getItem(key)
			case 'set':
				return localStorage.setItem(key, value)
			case 'remove':
				return localStorage.removeItem(key)
			case 'clear':
				return localStorage.clear()
			default:
				return
		}
	}
}

//user thunks
export const signupThunk = (payload) => async (dispatch) => {
	try {
		const { data: user } = await API.auth.createUser(payload)
		localStorageWrapper('set', 'user', JSON.stringify(user))
		const {
			data: { token }
		} = await API.auth.getToken(payload)
		localStorageWrapper('set', 'token', token)
		dispatch(signup({ user, token }))
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}
export const loginThunk = (userToLogin) => async (dispatch) => {
	try {
		console.log('user:', userToLogin)
		const {
			data: { token }
		} = await API.auth.getToken(userToLogin)
		localStorageWrapper('set', 'token', token)
		console.log('token', token)
		const { data: user } = await API.auth.getUser(token)
		localStorageWrapper('set', 'user', JSON.stringify(user))
		dispatch(login({ user, token }))
		return
	} catch (error) {
		console.log(error)
		return error
	}
}
export const logoutThunk = () => async (dispatch) => {
	try {
		await API.auth.logout()
		localStorageWrapper('clear')
		dispatch(logout())
		return
	} catch (error) {
		console.log(error)
		return error
	}
}
export const meThunk = (optionalToken) => async (dispatch) => {
	try {
		const { data: user } = await API.auth.getUser(optionalToken)
		dispatch(me(user))
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}
