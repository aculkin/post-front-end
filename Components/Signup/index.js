import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'

import { signupThunk } from '../../redux/auth'

const initialUserState = { name: '', email: '', password: '' }

export const Signup = () => {
	const dispatch = useDispatch()
	const [userInfo, setUserInfo] = useState(initialUserState)
	const [loading, setLoading] = useState(false)

	const handleChange = ({ target }) => {
		setUserInfo({ ...userInfo, [target.name]: target.value })
	}

	const handleSubmit = () => {
		setLoading(true)
		dispatch(signupThunk(userInfo))
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			name='basic'
			labelCol={{
				span: 8
			}}
			wrapperCol={{
				span: 16
			}}
			onFinish={handleSubmit}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
		>
			<Form.Item
				label='Full Name'
				name='name'
				onChange={handleChange}
				rules={[
					{
						required: true,
						message: 'Please input your name!'
					}
				]}
			>
				<Input name='name' />
			</Form.Item>
			<Form.Item
				label='Email'
				name='email'
				onChange={handleChange}
				rules={[
					{
						required: true,
						message: 'Please input your username!'
					}
				]}
			>
				<Input name='email' />
			</Form.Item>

			<Form.Item
				label='Password'
				name='password'
				onChange={handleChange}
				rules={[
					{
						required: true,
						message: 'Please input your password!'
					}
				]}
			>
				<Input.Password name='password' />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16
				}}
			>
				<Button type='primary' htmlType='submit' loading={loading}>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}
