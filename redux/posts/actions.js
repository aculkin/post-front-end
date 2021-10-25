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

export const createPostThunk =
	(postToCreate, afterComplete) => async (dispatch) => {
		try {
			const { data: newPost } = await API.posts.createPost(postToCreate)
			dispatch(createPost(newPost))
			afterComplete && afterComplete()
		} catch (error) {
			afterComplete && afterComplete(error)
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
export const editPostThunk =
	(postId, fieldsToEdit, afterComplete) => async (dispatch) => {
		try {
			const { data: editedPost } = await API.posts.editPost(
				postId,
				fieldsToEdit
			)
			dispatch(editPost(editedPost))
			afterComplete && afterComplete()
		} catch (error) {
			afterComplete && afterComplete(error)
			return error
		}
	}
export const deletePostThunk = (postId, afterComplete) => async (dispatch) => {
	try {
		await API.posts.deletePost(postId)
		dispatch(deletePost(postId))
		afterComplete && afterComplete()
	} catch (error) {
		afterComplete && afterComplete(error)
		return error
	}
}
export const loadMorePostsThunk =
	(lastPostDetails, afterComplete) => async (dispatch) => {
		try {
			const { data: morePosts } = await API.posts.loadMorePosts(lastPostDetails)
			dispatch(loadMorePosts(morePosts))
			afterComplete && afterComplete()
		} catch (error) {
			afterComplete && afterComplete(error)
			return error
		}
	}
export const refreshPostsThunk =
	(firstPostDetails, afterComplete) => async (dispatch) => {
		try {
			const { data: newPosts } = await API.posts.refreshPosts(firstPostDetails)
			dispatch(refreshPosts(newPosts))
			afterComplete && afterComplete()
		} catch (error) {
			afterComplete && afterComplete(error)
			return error
		}
	}
