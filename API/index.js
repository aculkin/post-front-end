import axios from 'axios'

import { auth } from './auth'
import { store } from '../redux'


axios.interceptors.request.use((req) => {
	const currentState = store.getState()
	const token = currentState?.auth?.token
	token && (req.headers.authorization = `Token ${token}`)
	return req
})

export const API = {
	auth
}

export default API
