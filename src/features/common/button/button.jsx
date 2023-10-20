import React from 'react'
import propTypes from 'prop-types'

// Mui material imports
import Button from '@mui/material/Button'

// Styles import
import * as styles from './buttonStyles'
import { Add } from '@mui/icons-material'

/**
 * Button
 * @param {*} props 
 * @returns 
 */
const StyledButton = (props) => {
    // object type props
    const { icon } = props
    // string type props
    const { name, variant } = props
    return (
        <Button variant={variant === 'prymary' ? 'contained' : variant === 'secondary' ? 'outlined' : variant === 'tertiary' ? 'text' : 'contained'} endIcon={icon ? icon : <Add />}>{name}</Button>
    )
}

StyledButton.propTypes = {
    name: propTypes.string.isRequired,
    variant: propTypes.string
}

StyledButton.defaultProps = {
    name: 'Insert name',
    variant : 'primary'
}

export default StyledButton