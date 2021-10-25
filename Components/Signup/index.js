import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { message, Form, Input, Button } from 'antd'

import { signupThunk } from '../../redux/auth'

const initialUserState = { name: '', email: '', password: '' }

export const Signup = () => {
	const dispatch = useDispatch()
	const [userInfo, setUserInfo] = useState(initialUserState)
	const [loading, setLoading] = useState(false)

	const handleChange = ({ target }) => {
		setUserInfo({ ...userInfo, [target.name]: target.value })
	}

	const afterSubmit = (error) => {
		setLoading(false)
		if (error) {
			console.log(error)
			error.message === 'Request failed with status code 400'
				? message.error(
						'There may be an account with this email already, try logging in'
				  )
				: message.error(error.message)
		} else {
			message.success('Successfully signed up!')
			router.push('/')
		}
	}

	const handleSubmit = () => {
		setLoading(true)
		dispatch(signupThunk(userInfo, afterSubmit))
	}

	const onFinishFailed = (error) => {
		let errorMessage =
			error.errorFields[0]?.errors?.[0] ||
			'Please fix the errors before submitting'
		message.warning(errorMessage)
	}

	return (
		<>
			<Form name='register' onFinish={handleSubmit}>
				<h1>Sign up for an account</h1>
				<Form.Item
					name='name'
					label='Name'
					onChange={handleChange}
					tooltip='What do you want others to call you?'
					rules={[
						{
							required: true,
							message: 'Please input your name!',
							whitespace: true
						}
					]}
				>
					<Input name='name' />
				</Form.Item>
				<Form.Item
					name='email'
					label='E-mail'
					tooltip='This will be your username when you log-in.'
					onChange={handleChange}
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!'
						},
						{
							required: true,
							message: 'Please input your E-mail!'
						}
					]}
				>
					<Input name='email' />
				</Form.Item>

				<Form.Item
					name='password'
					label='Password'
					onChange={handleChange}
					rules={[
						{
							required: true,
							message: 'Please input your password!'
						}
					]}
					hasFeedback
				>
					<Input.Password name='password' />
				</Form.Item>

				<Form.Item
					name='confirm'
					label='Confirm Password'
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!'
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve()
								}

								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								)
							}
						})
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Sign up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default Signup
