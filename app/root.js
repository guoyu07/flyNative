import React from 'react'
import { Provider } from 'react-redux'
import Store from './store/index'
import App from './containers/app'
import MyStorage from './storage/init'

const Root = () => (
  <Provider store={Store}>
    <App />
  </Provider>
)

export default Root
