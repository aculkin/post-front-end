// import axios from 'axios'

///test API routes for now
export const auth = {
	signup: (newUser) => {
		console.log('signing up a new user', newUser)
		return Promise.resolve({ data: newUser })
		//return axios.post(apiRoutes.auth.signup, newUser)
	},
	login: (userToLogin) => {
		console.log('Logging in a user:', userToLogin)
		return Promise.resolve({ data: userToLogin })
		//return axios.post(apiRoutes.auth.login, userToLogin)
	},
	logout: () => {
		console.log('Logging out the current user')
		return Promise.resolve()
		// return axios.post(apiRoutes.auth.logout)
	},
	me: () => {
		console.log('Getting the current logged in user')
		return Promise.resolve()
		// return axios.get(apiRoutes.auth.me)
	}
}
