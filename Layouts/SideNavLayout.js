import { Layout } from 'antd'
const { Content } = Layout

import { CustomFooter, SideNavBar } from '../Components'

export const SideNavLayout = ({ children }) => {
	return (
		<Layout style={{ minHeight: '100vh', marginLeft: 80 }}>
			<SideNavBar />
			<Layout>
				<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
					{children}
				</Content>
				<CustomFooter />
			</Layout>
		</Layout>
	)
}

export default SideNavLayout
