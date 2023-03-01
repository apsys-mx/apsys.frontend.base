import React from 'react'

/**
 * Landing page
 */
const LandingTemplate = ({ onLoginClick }) => {
	return (
		<div>
			<h1>Landing page template</h1>
			<button onClick={onLoginClick}>Login</button>
		</div>
	)
}
export default LandingTemplate
