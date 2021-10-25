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
		create: `${baseUrl}/api/post/posts/`,
		get: (id) => `${baseUrl}/api/post/posts/${id}/`,
		edit: (id) => `${baseUrl}/api/post/posts/${id}/`,
		delete: (id) => `${baseUrl}/api/post/posts/${id}/`
	}
}
export default apiRoutes
