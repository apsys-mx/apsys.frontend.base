import React from 'react'
import propTypes from 'prop-types'

import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import theme from '../../../../src/assets/themes/default.theme'
import CreatableSelect from 'react-select/creatable'
const SelectComponet = (props) => {
	//Titles props
	const { title, placeholder } = props
	const { options, defaultValue, onChange } = props

	return (
		<Box>
			<Typography
				component={'span'}
				sx={{
					color: theme.palette.text.dark,
				}}
				variant='caption'
			>
				{title}
			</Typography>
			<CreatableSelect
				isClearable
				placeholder={placeholder}
				options={options}
				defaultValue={defaultValue}
				onChange={(value) => onChange(value)}
				styles={{
					control: (base, state) => ({
						...base,
						background: 'transparent',
						marginTop: '5px',
						fontFamily: 'system-ui',
						border: '1px solid #000000',
					}),
					menu: (base, state) => ({
						...base,
						fontFamily: 'system-ui',
						zIndex: 10,
						maxHeight: 200,
						overflow: 'auto',
						color: theme.palette.text.dark,
					}),
					menuList: (base, state) => ({
						...base,
						maxHeight: 200,
						paddingTop: 0,
						color: theme.palette.text.dark,
					}),
					menuPortal: (base) => ({ ...base, zIndex: 9999 }),

					option: (provided, state) => ({
						...provided,
						backgroundColor: state.isSelected ? theme.palette.primary.main : 'none',
						color: state.isSelected
							? theme.palette.text.light
							: theme.palette.text.dark,
					}),
				}}
			/>
		</Box>
	)
}

SelectComponet.propTypes = {
	options: propTypes.arrayOf(
		propTypes.shape({
			value: propTypes.any.isRequired,
			label: propTypes.string.isRequired,
		})
	).isRequired,
	title: propTypes.string,
	onChange: propTypes.func.isRequired,
}
SelectComponet.defaultProps = {
	options: [],
	title: '',
	onChange: () => {
		console.warn('onChange callback not defined')
	},
}
export default SelectComponet
