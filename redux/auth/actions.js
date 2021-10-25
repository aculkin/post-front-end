import { LOGIN, LOGOUT, SIGNUP, ME, EDIT_USER_DETAILS } from './types'
import API from '../../API'

export const signup = (payload) => ({ type: SIGNUP, payload })
export const login = (payload) => ({ type: LOGIN, payload })
export const logout = () => ({ type: LOGOUT })
export const me = (payload) => ({ type: ME, payload })
export const editUserDetails = (payload) => ({
	type: EDIT_USER_DETAILS,
	payload
})

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

export const signupThunk = (payload, afterComplete) => async (dispatch) => {
	try {
		const { data: user } = await API.auth.createUser(payload)
		localStorageWrapper('set', 'user', JSON.stringify(user))
		const {
			data: { token }
		} = await API.auth.getToken(payload)
		localStorageWrapper('set', 'token', token)
		dispatch(signup({ user, token }))
		afterComplete && afterComplete()
		return user
	} catch (error) {
		afterComplete && afterComplete(error)
		return error
	}
}
export const loginThunk = (userToLogin, afterComplete) => async (dispatch) => {
	try {
		const {
			data: { token }
		} = await API.auth.getToken(userToLogin)
		localStorageWrapper('set', 'token', token)
		const { data: user } = await API.auth.getUser(token)
		localStorageWrapper('set', 'user', JSON.stringify(user))
		dispatch(login({ user, token }))
		afterComplete && afterComplete()
		return user
	} catch (error) {
		afterComplete && afterComplete(error)
		return error
	}
}
export const logoutThunk = (afterComplete) => async (dispatch) => {
	try {
		await API.auth.logout()
		localStorageWrapper('clear')
		dispatch(logout())
		afterComplete && afterComplete()
		return
	} catch (error) {
		afterComplete && afterComplete(error)
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
export const editUserDetailsThunk =
	(userDetailsToEdit, afterComplete) => async (dispatch) => {
		try {
			const { data: editedUser } = await API.auth.editUser(userDetailsToEdit)
			localStorageWrapper('set', 'user', JSON.stringify(editedUser))
			dispatch(editUserDetails(editedUser))
			afterComplete && afterComplete()
			return editedUser
		} catch (error) {
			afterComplete && afterComplete(error)
			return error
		}
	}
