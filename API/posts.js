import axios from 'axios'

import apiRoutes from './apiRoutes'

export const posts = {
	createPost: (postDetails) => {
		return axios.post(apiRoutes.post.create, postDetails)
	},
	loadPosts: () => {
		return axios.get(apiRoutes.post.list)
	},
	editPost: (postDetails) => {
		return Promise.resolve(postDetails)
	},
	deletePost: (postId) => {
		return Promise.resolve(postId)
	},
	loadMorePosts: () => {
		return Promise.resolve([])
	},
	refreshPosts: () => {
		return Promise.resolve([])
	}
}
