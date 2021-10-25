import { Row, Col } from 'antd'

import { Login } from '../../Components'

export const LoginOutline = () => {
	return (
		<Col>
			<Row
				style={{ padding: '50px 0px' }}
				type='flex'
				align='middle'
				justify='center'
			>
				<Login />
			</Row>
		</Col>
	)
}

export default LoginOutline
