import { GET_AUTH_TOKEN, LOGIN, LOGOUT, SIGNUP, ME } from './types'
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
		const { data: user } = await API.auth.signup(payload)
		localStorageWrapper('set', 'user', user)
		dispatch(signup(user))
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}
export const loginThunk = (userToLogin) => async (dispatch) => {
	try {
		const { data } = await API.auth.login(userToLogin)
		localStorageWrapper('set', 'token', data?.token)
		dispatch(login(data?.token || null))
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
export const meThunk = () => async (dispatch) => {
	try {
		const { data: user } = await API.auth.me()
		dispatch(me(user))
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}
