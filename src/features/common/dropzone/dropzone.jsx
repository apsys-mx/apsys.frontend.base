import React, { useMemo, useState } from 'react'

import propTypes from 'prop-types'
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
        onDelete,
        //Object type props
        acceptFiles = [],
        //Bool type props
        isMultipleFiles,
        canUploadFiles,
        canBeDelete,
        isUploadFiles,
        isDeletingFiles,
        error,
        // String types props
        action,
        title
    } = props;

	const [files, setFiles] = useState([])
	const { getRootProps, getInputProps } = useDropzone({
		accept: acceptFiles,
		onDrop: (acceptedFiles) => {
            if(isMultipleFiles){
                setFiles(acceptedFiles)
            }else {
                const fileslength = acceptedFiles.length
                acceptedFiles = [acceptedFiles[fileslength - 1]]
                setFiles(acceptedFiles)
            }
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
        onDelete(filtered)
	}

    /**
     *
     * @param {string} text
     * @param {int} characterLimit
     * @returns text whit character limit
     */
    const CharacterLimitTextConverter = (text, characterLimit) => {
        const replaceText = text.replace(" ","_")
        var lengthText = replaceText?.length
        if (lengthText >= characterLimit) {
            return replaceText.substring(0, characterLimit) + '...'
        }
	return text
    }
	return (
		<Box component='section' className='container' sx={{ width: '450px', height:'100px' }}>
            {
                files.length !== 1 && (
                <div {...getRootProps({ style })}> 
				<input {...getInputProps()} />
				<Typography variant='subtitle2'>
					<Stack direction={'column'} alignItems={'center'} spacing={0.5} >
                    <UploadFileIcon sx={styles.icon}/>
						<Box>{title}</Box>
					</Stack>
				</Typography>
			</div> )}
            <Stack alignItems={'center'} sx={styles.helperText}>
                    {action && files.length == 0 && <FormHelperText >{action}</FormHelperText>}
            </Stack>
            {
                files.length >= 1 && (
                <Box sx={styles.dropzoneUploaded} disabled={isUploadFiles || !canUploadFiles}>
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
                                            <Typography variant='body2' maxWidth="400px" overflow ={'hidden'}>
                                                {CharacterLimitTextConverter(file.name, 22)}
                                            </Typography>
                                        </Stack>
                                        <IconButton size='small' sx={styles.closeButton} disabled={isDeletingFiles || !canBeDelete}>
                                            <Close onClick={() => onDeleteFile(file)} />
                                        </IconButton>
                                    </Box>
                                )
                            })}
                        </Stack>
                    </Box>
                </Box>
                )
            }
            

		</Box>
	)
}
DropZone.propTypes = {
	errorList: propTypes.array,
    title: propTypes.string.isRequired,

    onChange: propTypes.func.isRequired,
    onDelete: propTypes.func.isRequired,

	error: propTypes.bool,
    canBeDelete: propTypes.bool,
    isDeletingFiles: propTypes.bool,
    isUploadFiles: propTypes.bool,
    canUploadFiles: propTypes.bool.isRequired,
    isMultipleFiles: propTypes.bool.isRequired
}
DropZone.defaultProps = {
    errorList: [],
    title: "Seleccione o arrastre archivo",
    
	onChange: () => {
        console.warn('onChange callback not defined')
	},
    onDelete: () => {
        console.warn('onDelete callback not defined')
	},

    error: false,
    canUploadFiles: true,
    canBeDelete: true,
    isDeletingFiles: false,
    isUploadFiles: false,
    isMultipleFiles: true,
}

export default DropZone
