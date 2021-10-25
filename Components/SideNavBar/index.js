import { useState } from 'react'
import { Menu, Layout, message } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import {
	UnorderedListOutlined,
	TeamOutlined,
	UserOutlined,
	LogoutOutlined
} from '@ant-design/icons'
import Link from 'next/link'

import { logoutThunk } from '../../redux/auth'

const { Sider } = Layout

export const SideNavBar = () => {
	const dispatch = useDispatch()
	const router = useRouter()

	let [collapsed, setCollapsed] = useState(true)

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}
	const afterComplete = (error) => {
		if (error) {
			message.error(error.mesasge)
		} else {
			router.push('/')
			message.success('Logged out successfully')
		}
	}

	const logout = () => {
		dispatch(logoutThunk(afterComplete))
	}

	let selectedKeys = () => {
		if (router.pathname.includes('/settings')) {
			return ['settings']
		} else if (router.pathname.includes('/groups')) {
			return ['groups']
		} else {
			return ['feed']
		}
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
			<Menu theme='dark' mode='inline' selectedKeys={selectedKeys()}>
				<Menu.Item key='feed' icon={<UnorderedListOutlined />}>
					<Link href='/'>Feed</Link>
				</Menu.Item>

				<Menu.Item key='settings' icon={<UserOutlined />}>
					<Link href='/settings'>Account Settings</Link>
				</Menu.Item>

				<Menu.Item key='groups' disabled icon={<TeamOutlined />}>
					<Link href='/groups'>Groups</Link>
				</Menu.Item>
				<Menu.Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
					Logout
				</Menu.Item>
			</Menu>
		</Sider>
	)
}

export default SideNavBar
