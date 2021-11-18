import { Provider } from 'react-redux'
import store from '../store'
import 'antd/dist/antd.css';
import '../styles/main.css'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
}

export default MyApp
