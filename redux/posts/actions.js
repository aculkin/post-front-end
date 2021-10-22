import * as types from './types'
import API from '../../API'

export const createPost = (newPost) => ({
	type: types.CREATE_POST,
	payload: newPost
})
export const loadPosts = (posts) => ({ type: types.LOAD_POSTS, payload: posts })
export const editPost = (editedPost) => ({
	type: types.EDIT_POST,
	payload: editedPost
})
export const deletePost = (postId) => ({
	type: types.DELETE_POST,
	payload: postId
})
export const loadMorePosts = (additionalPosts) => ({
	type: types.LOAD_MORE_POSTS,
	payload: additionalPosts
})
export const refreshPosts = (newPosts) => ({
	type: types.REFRESH_POSTS,
	payload: newPosts
})

export const createPostThunk = (postToCreate) => async (dispatch) => {
	try {
		const { data: newPost } = await API.posts.createPost(postToCreate)
		dispatch(createPost(newPost))
	} catch (error) {
		console.log(error)
		return error
	}
}
export const loadPostsThunk = () => async (dispatch) => {
	try {
		const { data: posts } = await API.posts.loadPosts()
		dispatch(loadPosts(posts))
	} catch (error) {
		console.log(error)
		return error
	}
}
export const editPostThunk = (postToEdit) => async (dispatch) => {
	try {
		const { data: editedPost } = await API.posts.editPost(postToEdit)
		dispatch(editPost(editedPost))
	} catch (error) {
		console.log(error)
		return error
	}
}
export const deletePostThunk = (postId) => async (dispatch) => {
	try {
		await API.posts.deletePost(postId)
		dispatch(deletePost(postId))
	} catch (error) {
		console.log(error)
		return error
	}
}
export const loadMorePostsThunk = (lastPostDetails) => async (dispatch) => {
	try {
		const { data: morePosts } = await API.posts.loadMorePosts(lastPostDetails)
		dispatch(loadMorePosts(morePosts))
	} catch (error) {
		console.log(error)
		return error
	}
}
export const refreshPostsThunk = (firstPostDetails) => async (dispatch) => {
	try {
		const { data: newPosts } = await API.posts.refreshPosts(firstPostDetails)
		dispatch(refreshPosts(newPosts))
	} catch (error) {
		console.log(error)
		return error
	}
}
