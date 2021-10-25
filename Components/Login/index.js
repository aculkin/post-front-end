import styles from './index.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { message, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { loginThunk } from '../../redux/auth'

const initialUserState = { email: '', password: '' }

export const Login = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const [userInfo, setUserInfo] = useState(initialUserState)
	const [loading, setLoading] = useState(false)

	const handleChange = ({ target }) =>
		setUserInfo({ ...userInfo, [target.name]: target.value })

	const afterSubmit = (error) => {
		setLoading(false)
		if (error) {
			error.message === 'Request failed with status code 400'
				? message.error('User name or password incorrect')
				: message.error(error.message)
		} else {
			message.success('Successfully logged in')
			router.push('/')
		}
	}

	const handleSubmit = () => {
		setLoading(true)
		dispatch(loginThunk(userInfo, afterSubmit))
	}

	const onFinishFailed = (error) => {
		let errorMessage =
			error.errorFields[0]?.errors?.[0] ||
			'Please fix the errors before submitting'
		message.warning(errorMessage)
	}

	return (
		<>
			<Form
				name='normal_login'
				className={styles['login-form']}
				initialValues={{ remember: true }}
				onFinish={handleSubmit}
				onFinishFailed={onFinishFailed}
			>
				<h1>Login to your account</h1>
				<Form.Item
					name='email'
					rules={[{ required: true, message: 'Please input your Username!' }]}
					onChange={handleChange}
					value={userInfo.email}
				>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Email'
						name='email'
					/>
				</Form.Item>
				<Form.Item
					name='password'
					rules={[{ required: true, message: 'Please input your Password!' }]}
					onChange={handleChange}
					value={userInfo.password}
				>
					<Input.Password
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						name='password'
						placeholder='Password'
					/>
				</Form.Item>
				<Form.Item>
					<Form.Item name='remember' valuePropName='checked' noStyle>
						<Checkbox disabled>Remember me</Checkbox>
					</Form.Item>
					<Link passHref href='/forgot-password'>
						<a className={styles['login-form-forgot']}>Forgot password</a>
					</Link>
				</Form.Item>

				<Form.Item>
					<Button
						type='primary'
						htmlType='submit'
						className={styles['login-form-button']}
					>
						Log in
					</Button>
					Or{' '}
					<Link href='/signup' passHref>
						<a>Signup now!</a>
					</Link>
				</Form.Item>
			</Form>
		</>
	)
}

export default Login
