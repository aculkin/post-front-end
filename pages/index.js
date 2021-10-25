import { useSelector } from 'react-redux'

import { LoginOutline, DashboardOutline } from '../PageOutlines'

export const HomePage = () => {
	let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
	return <>{isAuthenticated ? <DashboardOutline /> : <LoginOutline />}</>
}

export default HomePage
