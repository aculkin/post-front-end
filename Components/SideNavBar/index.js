import { useState } from 'react'
import { Menu, Layout } from 'antd'
import { useDispatch } from 'react-redux'

import {
	UnorderedListOutlined,
	TeamOutlined,
	UserOutlined,
	LogoutOutlined
} from '@ant-design/icons'
import Link from 'next/link'

import { logoutThunk } from '../../redux/auth'

const { Header, Content, Footer, Sider } = Layout

export const SideNavBar = () => {
	const dispatch = useDispatch()
	let [collapsed, setCollapsed] = useState(true)

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	const logout = () => {
		dispatch(logoutThunk())
	}

	return (
		<Sider
			style={{
				overflow: 'auto',
				height: '100vh',
				position: 'fixed',
				left: 0,
				zIndex: 1
			}}
			collapsible
			collapsed={collapsed}
			onCollapse={toggleCollapsed}
		>
			<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
				<Menu.Item key='1' icon={<UnorderedListOutlined />}>
					<Link href='/'>Feed</Link>
				</Menu.Item>

				<Menu.Item key='2' icon={<UserOutlined />}>
					<Link href='/settings'>Account Settings</Link>
				</Menu.Item>

				<Menu.Item key='3' disabled icon={<TeamOutlined />}>
					<Link href='/groups'>Groups</Link>
				</Menu.Item>
				<Menu.Item key='4' icon={<LogoutOutlined />} onClick={logout}>
					Logout
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SideNavBar
