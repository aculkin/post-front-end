import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { signupThunk } from '../redux/auth'

export const SignupPage = () => {
	const initialUserState = { name: '', email: '', password: '' }
	const [userinfo, setUserinfo] = useState(initialUserState)

	const dispatch = useDispatch()

	const handleChange = (_e, { name, value }) => {
		setUserinfo({ ...userinfo, [name]: value })
	}

	const handleSubmit = () => {
		console.log('Signing up')
		dispatch(signupThunk(userinfo))
	}

	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Sign up for an account
				</Header>
				<Form size='large' onSubmit={handleSubmit}>
					<Segment stacked>
						<Form.Input
							fluid
							name='name'
							onChange={handleChange}
							value={userinfo.name}
							placeholder='Full name'
						/>
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
						<Button color='teal' fluid size='large'>
							Create Account
						</Button>
					</Segment>
				</Form>
				<Message>
					Already have an account?{' '}
					<Link href='/login'>
						<a>Log in</a>
					</Link>
				</Message>
			</Grid.Column>
		</Grid>
	)
}

export default SignupPage
