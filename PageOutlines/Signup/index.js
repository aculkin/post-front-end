import { Row, Col } from 'antd'

import { Signup } from '../../Components'

export const SignupOutline = () => {
	return (
		<Col>
			<Row
				style={{ padding: '100px 0px' }}
				type='flex'
				align='middle'
				justify='center'
			>
				<Signup />
			</Row>
		</Col>
	)
}

export default SignupOutline
