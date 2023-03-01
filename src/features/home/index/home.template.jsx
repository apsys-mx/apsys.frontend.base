import React from 'react'

/**
 * Home component
 */
const HomeTemplate = ({ title, onchangeTitle }) => {
	return (
		<div>
			<h1>Home page</h1>
			<h2>{title}</h2>
			<input onChange={onchangeTitle} />
		</div>
	)
}

export default HomeTemplate
