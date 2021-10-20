import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { loginThunk } from '../redux/auth'

export const LoginPage = () => {
	const initialUserState = { email: '', password: '' }
	const [userinfo, setUserinfo] = useState(initialUserState)

	const dispatch = useDispatch()

	const handleChange = (_e, { name, value }) => {
		console.log(_e, name, value)
		setUserinfo({ ...userinfo, [name]: value })
	}

	const handleSubmit = () => {
		console.log('Loggin in')
		dispatch(loginThunk(userinfo))
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
				</Message>
			</Grid.Column>
		</Grid>
	)
}

export default LoginPage
