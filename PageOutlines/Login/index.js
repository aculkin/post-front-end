import { Row, Col } from 'antd'

import { Login } from '../../Components'

export const LoginPage = () => {
	return (
		<Row style={{ margin: '100px' }}>
			<Col offset={5} span={10}>
				<Login />
			</Col>
		</Row>
	)
}

export default LoginPage
