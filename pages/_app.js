import 'semantic-ui-css/semantic.min.css'
import 'antd/dist/antd.css'

import { Provider } from 'react-redux'

import { useStore } from '../redux'

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState)

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
