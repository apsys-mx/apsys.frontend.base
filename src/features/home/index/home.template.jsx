import React from 'react'

/**
 * Home component
 */
const HomeTemplate = ({ title, onchangeTitle, onLogoutClick }) => {
	return (
		<div>
			<h1>Home page</h1>
			<h2>{title}</h2>
			<input onChange={onchangeTitle} />
			<button onClick={onLogoutClick}>Logout</button>
		</div>
	)
}

export default HomeTemplate
