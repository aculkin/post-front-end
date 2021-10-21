const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

export const apiRoutes = {
	base: baseUrl,
	auth: {
		login: `${baseUrl}/api/user/token/`,
		signup: `${baseUrl}/api/user/create/`,
        me: `${baseUrl}/api/user/me/`
	},
	post: {
		list: `${baseUrl}/api/post/posts/`,
		create: `${baseUrl}/api/post/posts/`
	}
}
export default apiRoutes
