import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { message, Form, Input, Button } from 'antd'
import { loginThunk } from '../../redux/auth'

const initialUserState = { email: '', password: '' }

export const Login = () => {
	const dispatch = useDispatch()
	const [userInfo, setUserInfo] = useState(initialUserState)
	const [loading, setLoading] = useState(false)

	const handleChange = (e, options) =>
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value })

	const handleSubmit = () => {
		setLoading(true)
		dispatch(loginThunk(userInfo))
	}

	const onFinishFailed = (errorInfo) => {
		message.warning(`Login failed: ${errorInfo}`)
		console.log('Failed:', errorInfo)
	}

	return (
		<>
			<h1>Log in to your account</h1>
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
		</>
	)
}

export default Login
