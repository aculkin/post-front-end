import { Layout } from 'antd'

import { Signup } from '../../PageOutlines'
const { Content, Header, Footer } = Layout

export const SignupPage = () => {
	return (
		<Layout>
			<Header />
			<Content>
				<Signup />
			</Content>
			<Footer />
		</Layout>
	)
}

export default SignupPage
