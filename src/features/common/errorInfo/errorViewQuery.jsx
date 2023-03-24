import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ErrorBadRequest from '../../../assets/img/ErrorBadRequest.png'
import * as styles from './errorViewQuery.styles'
const ErrorViewQuery = ({ error }) => {
	return (
		<Box sx={styles.content}>
			<Stack direction={'row'}>
				<Box component={'img'} src={ErrorBadRequest} sx={styles.img} />
				<details>
					<div styles={styles.messageError}>
						Mensage:{' '}
						{error.data
							? error.data.title
								? error.data.title
								: error.data
							: 'Error de consulta con la API'}
					</div>
					<div styles={styles.messageError}>Estatus: {error ? error.status : ''}</div>
					<summary>Error: Ocurrio un error.</summary>
				</details>
			</Stack>
		</Box>
	)
}
export default ErrorViewQuery
