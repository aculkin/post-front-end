import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message, Form, Input, Button, Divider } from 'antd'

import { editUserDetailsThunk } from '../../redux/auth'

const initialUserInfoState = {
	name: '',
	email: '',
	password: '',
	newPasswordCheck: ''
}

export const AccountSettings = () => {
	const user = useSelector((state) => state.auth.user)
	const dispatch = useDispatch()
	const [userInfo, setUserInfo] = useState({ ...initialUserInfoState, ...user })
	const [loading, setLoading] = useState(false)

	const handleChange = ({ target }) =>
		setUserInfo({ ...userInfo, [target.name]: target.value })

	const afterSubmit = (error) => {
		setLoading(false)
		if (error) {
			message.error(error.message)
		} else {
			message.success('Account details updated successfully')
			setUserInfo({ ...initialUserInfoState, ...user })
		}
	}

	const handleSubmit = () => {
		let fieldsToChange = {}
		if (userInfo.name !== user.name) {
			fieldsToChange.name = userInfo.name
		}
		if (userInfo.email !== user.email) {
			fieldsToChange.email = userInfo.email
		}
		if (userInfo.password) {
			fieldsToChange.password = userInfo.password
		}
		dispatch(editUserDetailsThunk(fieldsToChange, afterSubmit))
	}

	const onFinishFailed = () => {
		setLoading(false)
		message.error('Something went wrong')
	}

	return (
		<>
			<Form
				name='basic'
				// labelCol={{
				// 	span: 4
				// }}
				// wrapperCol={{
				// 	span: 20
				// }}
				onFinish={handleSubmit}
				onFinishFailed={onFinishFailed}
				initialValues={userInfo}
			>
				<h1>Edit your account details</h1>
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
					<Input name='name' value={userInfo.name} />
				</Form.Item>
				<Form.Item
					label='Email'
					name='email'
					onChange={handleChange}
					value={userInfo.email}
					rules={[
						{
							required: true,
							message: 'You need to have a valid email'
						}
					]}
				>
					<Input name='email' />
				</Form.Item>
				<Divider>Change Password</Divider>
				<Form.Item
					label='New Password'
					name='password'
					onChange={handleChange}
					value={userInfo.password}
				>
					<Input.Password name='password' />
				</Form.Item>
				<Form.Item
					label='Confirm New Password'
					name='newPasswordCheck'
					onChange={handleChange}
					value={userInfo.newPasswordCheck}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!'
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (getFieldValue('password') === value) {
									return Promise.resolve()
								}

								return Promise.reject(
									new Error('The two passwords that you entered do not match!')
								)
							}
						})
					]}
				>
					<Input.Password name='oldPassword' />
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

export default AccountSettings
