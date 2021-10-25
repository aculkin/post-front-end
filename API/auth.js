import axios from 'axios'

import apiRoutes from './apiRoutes'

///test API routes for now
export const auth = {
	getToken: (userToGetToken) =>
		axios.post(apiRoutes.auth.getToken, userToGetToken),
	getUser: (optionalToken) =>
		optionalToken
			? axios.get(apiRoutes.auth.getUser, {
					headers: { Authorization: `Token ${optionalToken}` }
			  })
			: axios.get(apiRoutes.auth.getUser),
	createUser: (newUser) => axios.post(apiRoutes.auth.createUser, newUser),
	editUser: (userDetailsToEdit) =>
		axios.patch(apiRoutes.auth.getUser, userDetailsToEdit),
	logout: () => {
		return Promise.resolve()
	}
}
