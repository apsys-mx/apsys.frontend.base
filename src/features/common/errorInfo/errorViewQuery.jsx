import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ErrorBadRequest from '../../../assets/img/ErrorBadRequest.png'
import * as styles from './errorViewQuery.styles'
import propTypes from 'prop-types'

/**
 * ErrorViewQuery component
 */
const ErrorViewQuery = ({ error }) => {
	return (
		<Box sx={styles.content}>
			<Stack direction={'row'}>
				<Box component={'img'} src={ErrorBadRequest} sx={styles.img} />
				<details>
					<Box sx={styles.messageError}>
						Mensage: {'Error de consulta con la API'}
					</Box>
					<Box sx={styles.messageError}>Estatus: {error ? error.status : ''}
					</Box>
					<summary>Error: Ocurrió un error.</summary>
				</details>
			</Stack>
		</Box>
	)
}
ErrorViewQuery.propTypes = {
	error: propTypes.object.isRequired
}

export default ErrorViewQuery
