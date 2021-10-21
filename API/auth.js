import axios from 'axios'

import apiRoutes from './apiRoutes'

///test API routes for now
export const auth = {
	signup: (newUser) => {
		return axios.post(apiRoutes.auth.signup, newUser)
	},
	login: (userToLogin) => {
		return axios.post(apiRoutes.auth.login, userToLogin)
	},
	logout: () => {
		return Promise.resolve()
	},
	me: () => {
		return axios.get(apiRoutes.auth.me)
	}
}
