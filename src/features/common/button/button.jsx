import React from 'react'
import propTypes from 'prop-types'

// Mui material imports
import Button from '@mui/material/Button'

// Styles import
import * as styles from './buttonStyles'

/**
 * Button
 * @param {*} props 
 * @returns 
 */
const StyledButton = (props) => {
    // string type props
    const { name } = props
    return (
        <Button variant = 'contained'>{name}</Button>
    )
}

StyledButton.propTypes = {
    name: propTypes.string.isRequired
}

StyledButton.defaultProps = {
    name: 'Insert name'
}

export default Button