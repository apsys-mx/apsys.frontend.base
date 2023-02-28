import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

/**
 * Root view component
 * @param {*} props
 * @returns
 */
const RootView = (props) => {
	return <Provider store={store}>{props.children}</Provider>
}
export default RootView
