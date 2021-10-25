import { Modal, Button, Input, Form } from 'antd'
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
	const [form] = Form.useForm()
	const [visible, setVisible] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	const showModal = () => {
		setVisible(true)
	}

	const afterSubmit = (error) => {
		setSubmitLoading(false)
		if (error) {
		} else {
			setVisible(false)
		}
	}

	const handleSubmit = () => {
		setSubmitLoading(true)
		dispatch(createPostThunk(form.getFieldsValue(), afterSubmit))
	}

	const handleCancel = () => {
		setVisible(false)
	}

	const handleChange = (changed) =>
		changed.forEach(({ name, value }) => form.setFieldsValue({ [name]: value }))

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
				<Form onFieldsChange={handleChange} form={form}>
					<p>Write what you would like to post below</p>
					<Form.Item name='title'>
						<Input placeholder='Post Title' />
					</Form.Item>
					<Form.Item name='content'>
						<TextArea showCount maxLength={500} placeholder='Post Content' />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default NewPost
