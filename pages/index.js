import { useSelector } from 'react-redux'

import { Login, Dashboard } from '../PageOutlines'

export const HomePage = () => {
	let isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
	return <>{isAuthenticated ? <Dashboard /> : <Login />}</>
}

export default HomePage
