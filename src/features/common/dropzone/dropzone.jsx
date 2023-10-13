import React, { useMemo, useState } from 'react'

import propTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'

// Mui material imports
import { Box } from '@mui/system'
import { Typography, FormHelperText, Stack, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FilePresentIcon from '@mui/icons-material/FilePresent';

import * as styles from './dropzone.styles'

/**
 * Dropzone component
 */
const DropZone = (props) => {
    const {
        //Function type props
        onChange,
        //Object type props
        acceptFiles = {},
        //Bool type props
        isMultipleFiles,
        canUploadFiles,
        canBeDelete,
        isUploadFiles,
        isDeletingFiles,
        error,
        // String types props
        action,
        title} = props;

	const [files, setFiles] = useState([])
	const { t } = useTranslation()
	const { getRootProps, getInputProps } = useDropzone({
		accept: acceptFiles,
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

    /**
     *
     * @param {string} text
     * @param {int} characterLimit
     * @returns text whit character limit
     */
    const CharacterLimitTextConverter = (text, characterLimit) => {
        var lengthText = text?.length
        if (lengthText >= characterLimit) {
            return text.substring(0, characterLimit) + '...'
        }
	return text
    }
	return (
		<Box component='section' className='container' sx={{ width: '450px', height:'100px' }}>
			{files.length == 0 &&<div {...getRootProps({ style })}>
				<input {...getInputProps()} />
				<Typography variant='subtitle2'>
					<Stack direction={'column'} alignItems={'center'} spacing={0.5} >
                    <UploadFileIcon sx={styles.icon}/>
						<Box>{title ? title :"Seleccione o arrastre el catálogo de productos"}</Box>
					</Stack>
				</Typography>
			</div>}

            { files.length >= 1 &&
            <Box sx={styles.dropzoneUploaded}>
                <Typography variant='subtitle2'>
                    Archivo cargado:
                </Typography>
                <Box sx={ styles.filesContainer} >
                    <Stack spacing={1}>
                        {files.map((file) => {
                            return (
                                <Box sx={styles.fileItem}>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                        <FilePresentIcon fontSize='small' />
                                        <Typography variant='body2'>
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
            </Box>}

            <Stack alignItems={'center'} sx={styles.helperText}>
                    {action && files.length == 0 && <FormHelperText >{action}</FormHelperText>}
            </Stack>
		</Box>
	)
}
DropZone.propTypes = {
	errorList: propTypes.array,
    title: propTypes.string,
    onChange: propTypes.func.isRequired,
	error: propTypes.bool,
    canUploadFiles: propTypes.bool,
    canBeDelete: propTypes.bool,
    isUploadFiles: propTypes.bool,
    isDeletingFiles: propTypes.bool,
    isMultipleFiles: propTypes.bool.isRequired
}
DropZone.defaultProps = {
	error: false,
    isMultipleFiles: true,
	errorList: [],
	onChange: () => {
		console.warn('onImagesChange callback not defined')
	},
}

export default DropZone
