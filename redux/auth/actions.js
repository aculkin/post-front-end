import { GET_AUTH_TOKEN, LOGIN, LOGOUT, SIGNUP, ME } from './types'
import API from '../../API'

//user actions
export const signup = (payload) => ({ type: SIGNUP, payload })
export const login = (payload) => ({ type: LOGIN, payload })
export const logout = () => ({ type: LOGOUT })
export const loadUser = (payload) => ({ type: ME, payload })

//user thunks
export const signupThunk = (payload) => async (dispatch) => {
	try {
		const { data: user } = await API.auth.signup(payload)
		dispatch(signup(user))
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}
export const loginThunk = (userToLogin) => async (dispatch) => {
	try {
		const { data: user } = await API.auth.login(userToLogin)
		dispatch(login(user))
		return user
	} catch (error) {
		console.log(error)
		return error
	}
}
export const logoutThunk = () => async (dispatch) => {
	try {
		await API.auth.logout()
		dispatch(logout())
		return null
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
