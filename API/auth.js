import axios from 'axios'

import apiRoutes from './apiRoutes'

///test API routes for now
export const auth = {
	getToken: (userToGetToken) => {
		return axios.post(apiRoutes.auth.getToken, userToGetToken)
	},
	getUser: (optionalToken) => {
		return optionalToken
			? axios.get(apiRoutes.auth.getUser, {
					headers: { Authorization: `Token ${optionalToken}` }
			  })
			: axios.get(apiRoutes.auth.getUser)
	},
	createUser: (newUser) => {
		return axios.post(apiRoutes.auth.signup, newUser)
	},
	logout: () => {
		return Promise.resolve()
	},
}
