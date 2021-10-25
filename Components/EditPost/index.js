import { message, Modal, Input, Form, Button } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { editPostThunk } from '../../redux/posts'

const { TextArea } = Input

export const EditPostForm = ({ post, closeModal }) => {
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const [submitLoading, setSubmitLoading] = useState(false)

	const afterSubmit = (error) => {
		setSubmitLoading(false)
		if (error) {
			message.error('Post editing failed')
			console.log(error)
		} else {
			message.success('Post edited successfully')
			closeModal()
		}
		form.setFieldsValue(post)
	}

	const handleSubmit = (values) => {
		setSubmitLoading(true)
		dispatch(editPostThunk(post.id, values, afterSubmit))
	}

	const handleChange = (changed) =>
		changed.forEach(({ name, value }) =>
			form.setFieldsValue({
				[name]: value
			})
		)

	return (
		<Form
			onFieldsChange={handleChange}
			form={form}
			onFinish={handleSubmit}
			initialValues={post}
		>
			<p>Edit your post with the form below</p>
			<Form.Item name='title' placeholder='Post Title'>
				<Input />
			</Form.Item>
			<Form.Item name='content' placeholder='Post Content'>
				<TextArea showCount maxLength={500} />
			</Form.Item>
			<Form.Item>
				<Button type='primary' htmlType='submit' loading={submitLoading}>
					Submit Edit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default EditPostForm
