import React, { useMemo, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { v4 as uuidv4 } from 'uuid'

import { Box } from '@mui/system'
import { useDropzone } from 'react-dropzone'
import * as styles from './dropzone.styles'
import { Typography, FormHelperText, Chip, Stack, IconButton } from '@mui/material'
import { Close, Upload, WarningRounded } from '@mui/icons-material'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import UploadFileIcon from '@mui/icons-material/UploadFile';

/**
 *
 * @param {string} text
 * @param {int} characterLimit
 * @returns text whit character limit
 */
export const CharacterLimitTextConverter = (text, characterLimit) => {
	var lengthText = text?.length
	if (lengthText >= characterLimit) {
		return text.substring(0, characterLimit) + '...'
	}

	return text
}

/**
 * Dropzone component
 */
const DropZone = ({ onChange, acceptValue = {}, label, error, helperText, dropzoneLabel }) => {
	const [files, setFiles] = useState([])
	const { t } = useTranslation()
	const { getRootProps, getInputProps } = useDropzone({
		accept: acceptValue,
		onDrop: (acceptedFiles) => {
			setFiles(acceptedFiles)
			onChange(acceptedFiles)
		},
	})

	const style = useMemo(
		() => ({
			...styles.baseStyle,
			...(error === true ? styles.rejectStyle : {}),
		}),
		[error]
	)

	const onDeleteFile = (file) => {
		var filtered = files.filter((x) => x.name !== file.name)
		setFiles(filtered)
		onChange(filtered)
	}
	return (
		<Box component='section' className='container' sx={{ width: '50%' }}>
			{/* {label && <FormHelperText>{label}</FormHelperText>} */}
			<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<Typography variant='subtitle2'>
					<Stack direction={'column'} alignItems={'center'} spacing={0.5} >
						<UploadFileIcon fontSize='small' />
						<Box>{dropzoneLabel ? dropzoneLabel :"Seleccione o arrastre el catálogo de productos"}</Box>
					</Stack>
				</Typography>
			</div>
			<Box sx={styles.filesContainer}>
				<Stack spacing={1}>
					{files.map((file) => {
						return (
							<Box sx={styles.fileItem}>
								<Stack direction={'row'} alignItems={'center'} spacing={1}>
									<InsertDriveFileOutlinedIcon fontSize='small' />
									<Typography variant='caption'>
										{CharacterLimitTextConverter(file.name, 47)}
									</Typography>
								</Stack>
								<Box>
									<IconButton size='small' sx={styles.closeButton}>
										<Close onClick={() => onDeleteFile(file)} />
									</IconButton>
								</Box>
							</Box>
						)
					})}
				</Stack>
			</Box>
			{helperText && <FormHelperText error={true}>{helperText}</FormHelperText>}
		</Box>
	)
}
DropZone.propTypes = {
	error: propTypes.bool,
	errorList: propTypes.array,
	onChange: propTypes.func.isRequired,
}
DropZone.defaultProps = {
	error: false,
	errorList: [],
	onChange: () => {
		console.warn('onImagesChange callback not defined')
	},
}

export default DropZone
