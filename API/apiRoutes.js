const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

const apiRoutes = {
    base: baseUrl,
    login: `${baseUrl}/api/user/token`,
    signup: `${baseUrl}/api/user/create`,
    post: {
        list: `${baseUrl}/api/post/posts`,
        create: `${baseUrl}/api/post/posts`,
    }
}