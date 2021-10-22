const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

export const apiRoutes = {
	base: baseUrl,
	auth: {
		getToken: `${baseUrl}/api/user/token/`,
		getUser: `${baseUrl}/api/user/me/`,
		createUser: `${baseUrl}/api/user/create/`
	},
	post: {
		list: `${baseUrl}/api/post/posts/`,
		create: `${baseUrl}/api/post/posts/`
	}
}
export default apiRoutes
