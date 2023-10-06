import React from 'react'
import { Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import propTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
/**
 * A vertical datagrid
 */
const VerticalDatagrid = ({ properties }) => {
	return (
		<Table size='small'>
			<TableBody>
				{properties.map((item) => {
					return (
						<TableRow key={uuidv4()}>
							<TableCell>
								<Typography variant='subtitle2' noWrap>
									{item.key}
								</Typography>
							</TableCell>
							<TableCell>
								<Typography variant='body2' noWrap>
									{item.value}
								</Typography>
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
VerticalDatagrid.propTypes = {
	properties: propTypes.arrayOf(
		propTypes.shape({
			key: propTypes.any.isRequired,
			values: propTypes.oneOfType([propTypes.any, propTypes.array]),
		})
	),
}
VerticalDatagrid.defaultProps = {
	properties: [],
}
export default VerticalDatagrid
