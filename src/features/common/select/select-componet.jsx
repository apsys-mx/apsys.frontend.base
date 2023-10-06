import React from 'react'
import { Box } from '@mui/system'
import Select from 'react-select'
import { Typography } from '@mui/material'

const SelectComponet = (props) => {
	const { options, title,  defaultValue } = props
	return (
		<Box>
			<Typography 
				component={'span'}
				sx={{ 
					color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
					textShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
				}}
				variant='caption'>
				{title}
			
			</Typography>
			<Select
				placeholder={title}
				closeMenuOnSelect={false}
				{...props}
				isMulti
				options={options}
				defaultValue={defaultValue}
				styles={{
					control: (base, state) => ({
						...base,
						background: 'none',
						marginTop: '5px',
					}),
					menu: (base, state) => ({
						...base,
						zIndex: 10,
						maxHeight: 200,
						marginTop: '16px'
					}),
					menuList: (base) => ({ ...base, maxHeight: 200, paddingTop: 0 }),
					menuPortal: (base) => ({ ...base, zIndex: 9999 }), /// THIS IS TO SHOW MENU OVER MODAL
				}}
				formatGroupLabel={title}
			/>
		</Box>
	)
}

SelectComponet.propTypes = {
	// options: propTypes.object.isRequired,
	// title: propTypes.string,
	// stylesTitle: propTypes.array,
}
SelectComponet.defaultProps = {
	options: {},
	title: '',
	stylesTitle: {},
}
export default SelectComponet
