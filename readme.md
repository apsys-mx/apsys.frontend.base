## Install vitejs

-   Clone the repository with `https://github.com/apsys-mx/apsys.frontend.base.turkey.git`
-   Change to `apsys.frontend.base.turkey`
-   Run the command `npm create vite@latest .`
-   Run the command `npm install`
-   Run the command `npm run dev`

Check that the project is running correctly

## Install and configure redux store with redux-toolkit

### Set initial files structure

-   Delete files `App.css` and `index.css`
-   Rename files `App.jsx` to `app.jsx`
-   Change the `main.jsx` content as show below

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
```

-   Change the `app.jsx` content as show below

```jsx
import React from 'react'

const App = () => {
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	)
}

export default App
```

### Configure the redux store

-   Install redux `npm install react-redux` and redux-toolkit `npm install @reduxjs/toolkit`
-   Create a file `store/store,js` with the code show below

```javascript
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	devTools: process.env.NODE_ENV !== 'production',
})
```

-   Create a file `root-view.jsx` with the code show below

```jsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

const RootView = (props) => {
	return <Provider store={store}>{props.children}</Provider>
}
export default RootView
```
