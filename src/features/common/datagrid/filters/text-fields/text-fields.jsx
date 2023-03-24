//Import react section
import React from 'react'
import propTypes from 'prop-types'
import { Controller } from 'react-hook-form'

/** Material UI import section */
import { TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const TextfieldComponent = (props) => {
	const classes = useDefaultStyles()
	const { errors, name } = props

	const hasError = () => (errors && errors[name] ? true : false)

	const errorMessage = () =>
		hasError() ? (
			<Typography className={classes.helperText} variant='subtitle2' color='error'>
				{errors[name].message}
			</Typography>
		) : null

	return (
		<Controller
			render={({ field }) => (
				<TextField
					InputLabelProps={{
						classes: {
							root: classes.cssLabel,
							focused: classes.cssFocused,
						},
					}}
					InputProps={{
						classes: {
							root: classes.cssOutlinedInput,
							focused: classes.cssFocused,
							notchedOutline: !errors?.[name]
								? classes.notchedOutlineSuccess
								: classes.notchedOutline,
						},
						inputMode: 'text',
						className: classes.input,
					}}
					margin='dense'
					size='small'
					color='secondary'
					helperText={errorMessage()}
					{...props}
					{...field}
				/>
			)}
			control={props.control}
			rules={props.rules}
			name={name}
		/>
	)
}

TextfieldComponent.propTypes = {
	/**
	 * Determina the control from this component and evit re-renders
	 */
	control: propTypes.object.isRequired,
	/**
	 * The rules determine whether the field is required or not
	 */
	rules: propTypes.object.isRequired,
	/**
	 * The name determines where the value is saved, additional determines the name of the rule
	 */
	name: propTypes.string.isRequired,
}
TextfieldComponent.defaultProps = {
	control: {},
	rules: {},
	name: '',
}

const useDefaultStyles = makeStyles(() => ({
	cssLabel: {},
	cssFocused: {
		color: 'black !important',
	},
	cssOutlinedInput: {
		color: 'black !important',
	},
	notchedOutline: {
		borderColor: 'red !important',
		borderRadius: 8,
	},
	notchedOutlineSuccess: {
		borderWidth: '1px',
		color: 'red !important',
		borderRadius: 8,
	},
	input: {
		'&.Mui-disabled': {
			color: 'black',
			opacity: 1,
		},
	},
	helperText: { marginLeft: '-10px!important' },
}))

export default TextfieldComponent