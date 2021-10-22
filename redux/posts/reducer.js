import * as types from './types'

const initialPostState = []

export const postReducer = (state = initialPostState, { type, payload }) => {
	switch (type) {
		case types.CREATE_POST:
			return [payload, ...state]
		case types.LOAD_POSTS:
			return [...payload]
		case types.EDIT_POST:
			oldPost = state.find((post) => post.id === payload.id)
			return state.map((post) => {
				if (post.id === payload.id) {
					return payload
				} else {
					return post
				}
			})
		case types.DELETE_POST:
			return state.filter((post) => post.id !== payload)
		case types.LOAD_MORE_POSTS:
			return [...state, ...payload]
		case types.REFRESH_POSTS:
			return [...payload, ...state]
		default:
			return state
	}
}
