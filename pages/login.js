import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { loginThunk, logoutThunk, meThunk } from '../redux/auth'

export const LoginPage = () => {
	let authToken = useSelector((state) => state.auth.token)
	let user = useSelector((state) => state.auth.user)
	let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
	const initialUserState = { email: '', password: '' }
	const [userinfo, setUserinfo] = useState(initialUserState)

	const dispatch = useDispatch()

	const handleChange = (_e, { name, value }) => {
		setUserinfo({ ...userinfo, [name]: value })
	}

	const handleSubmit = () => {
		console.log('Loggin in')
		dispatch(loginThunk(userinfo))
	}

	const handleLogout = () => {
		console.log('Logging out')
		dispatch(logoutThunk())
	}

	const handleGetUser = () => {
		console.log('Getting user')
		dispatch(meThunk())
	}

	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Log-in to your account
				</Header>
				<Form size='large' onSubmit={handleSubmit}>
					<Segment stacked>
						<Form.Input
							fluid
							icon='user'
							name='email'
							onChange={handleChange}
							value={userinfo.email}
							iconPosition='left'
							placeholder='E-mail address'
						/>
						<Form.Input
							fluid
							icon='lock'
							name='password'
							onChange={handleChange}
							value={userinfo.password}
							iconPosition='left'
							placeholder='Password'
							type='password'
						/>

						<Button type='submit' color='teal' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
				<Message>
					New to us?{' '}
					<Link href='/signup'>
						<a>Sign Up</a>
					</Link>
					<Button onClick={handleLogout}>Logout</Button>
					<Button onClick={handleGetUser}>Get User</Button>
				</Message>
				{isAuthenticated && <Message>Authenticated!! {authToken}</Message>}
				{user && (
					<Message>
						User: {user.name}, {user.email}
					</Message>
				)}
			</Grid.Column>
		</Grid>
	)
}

export default LoginPage
