import React, { useState } from 'react';
import propTypes from 'prop-types'

// Mui material imports
import { Alert, AlertTitle, Stack, Snackbar } from '@mui/material'

// Styles import
import * as styles from './AlertComponent.styles' 

const AlertComponent = (props) => {
    // String type props
    const { title, description, severityType } = props
    // Number type props
    const { autoHideDuration } = props
    // Bool type props
    const { open } = props

    const [openAlert, setOpenAlert] = useState(open)
    
    // Set alet position
    const vertical = 'top'
    const horizontal = 'right'

    const handleClose = () => {
        setOpenAlert(false)
    };

    return (
        <div>
            <Snackbar open={openAlert} autoHideDuration={autoHideDuration} onClose={handleClose}  anchorOrigin={{ vertical, horizontal }} sx={styles.alertWidth} >
                <Stack sx={styles.fullWidth} spacing={2}>
                    <Alert severity={severityType}  onClose={handleClose} sx={styles.fullWidth}>
                        {title && ( <AlertTitle>{title}</AlertTitle>)}
                        {description}
                    </Alert>
                </Stack>
            </Snackbar>
        </div>
    );
}

AlertComponent.propTypes={
    open: propTypes.bool.isRequired,
    
    autoHideDuration: propTypes.number
,
    title: propTypes.string,
    description: propTypes.string.isRequired,
    severityType: propTypes.string.isRequired
}

AlertComponent.defaultProps ={
    open: false,
    autoHideDuration: null,
    
    description: "Alert description",
    severityType: "info",
}
export default AlertComponent;
