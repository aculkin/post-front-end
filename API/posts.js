import axios from 'axios'

import apiRoutes from './apiRoutes'

export const posts = {
	createPost: (postDetails) => axios.post(apiRoutes.post.create, postDetails),
	loadPosts: () => axios.get(apiRoutes.post.list),
	editPost: (postId, fieldsToEdit) =>
		axios.patch(apiRoutes.post.edit(postId), fieldsToEdit),
	deletePost: (postId) => axios.delete(apiRoutes.post.delete(postId)),
	loadMorePosts: () => Promise.resolve([]),
	refreshPosts: () => Promise.resolve([])
}
