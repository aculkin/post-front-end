import axios from 'axios'

import { auth } from './auth'
import { posts } from './posts'
import { store } from '../redux'

axios.interceptors.request.use((req) => {
	const currentState = store.getState()
	const token = currentState?.auth?.token
	token && (req.headers.authorization = `Token ${token}`)
	return req
})

export const API = {
	auth,
	posts
}

export default API
