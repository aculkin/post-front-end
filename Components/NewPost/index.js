import { Modal, Button, Input } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createPostThunk } from '../../redux/posts'

const { TextArea } = Input

const initialPostState = {
	title: '',
	content: ''
}

export const NewPost = () => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)
	const [postDetails, setPostDetails] = useState(initialPostState)

	const showModal = () => {
		setVisible(true)
	}

	const handleSubmit = () => {
		setSubmitLoading(true)
		dispatch(
			createPostThunk(postDetails, () => {
				setSubmitLoading(false)
				setVisible(false)
				setPostDetails(initialPostState)
			})
		)
		setTimeout(() => {}, 2000)
	}

	const handleCancel = () => {
		setVisible(false)
		setPostDetails(initialPostState)
	}

	const handleChange = (e) =>
		setPostDetails({ ...postDetails, [e.target.name]: e.target.value })

	return (
		<>
			<Button type='primary' onClick={showModal}>
				Create New Post
			</Button>
			<Modal
				title='New Post'
				visible={visible}
				onOk={handleSubmit}
				confirmLoading={submitLoading}
				onCancel={handleCancel}
			>
				<p>This is the modal test</p>
				<Input
					name='title'
					placeholder='Post Title'
					value={postDetails?.title}
					onChange={handleChange}
				/>
				<TextArea
					showCount
					maxLength={500}
					name='content'
					placeholder='Post Content'
					value={postDetails?.content}
					onChange={handleChange}
				/>
			</Modal>
		</>
	)
}

export default NewPost
