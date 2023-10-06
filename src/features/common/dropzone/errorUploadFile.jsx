//import react section
import React from 'react'
import propTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
//import mui section
import { Box } from '@mui/system'
import { Typography, Stack } from '@mui/material'
import { WarningRounded } from '@mui/icons-material'
//import resources section
import * as styles from './dropz-zone.styles'

const ErrorUploadFile = (props) => {
	const { t: translate } = useTranslation()
    const { dataErrors } = props
    return (
        dataErrors && dataErrors?.Errors?.length !== 0 &&
        <>
            <Stack>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{ margin: '15px 0px' }}
                >
                    <WarningRounded sx={styles.errorIcon} />
                    <Typography variant='caption'>{`Se han encontrado ${dataErrors && dataErrors?.Errors?.length} errores en el archivo cargado.`}</Typography>
                </Stack>
                <hr style={{ width: '95%' }} />
                {dataErrors?.Errors?.map((error, index) => {
                    return (
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            sx={{ marginTop: '15px' }}
                            key={index}
                        >
                            <Box sx={styles.errorUploadFile}>
                                <Typography variant='caption'>{`Error- ${error.Identifier}`}</Typography>
                            </Box>
                            <Typography variant='caption'>{`${translate(error.Message, { ns: error.FileTranslation})}`}</Typography>
                        </Stack>
                    )
                })}
            </Stack>
        </>
    )
}


ErrorUploadFile.propTypes = {
	dataErrors: propTypes.shape({
		Errors: propTypes.array,
	}),
}
ErrorUploadFile.defaultProps = {
	dataErrors: {
		Errors: [],
	},
}
export default ErrorUploadFile