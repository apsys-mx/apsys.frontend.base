import React from 'react';
import propTypes from 'prop-types'

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

const AlertComponent = (props) => {
    const {
        title,
        description,
        severityType,
        autoHideDuration
    } = props

    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'right',
      });
      const { vertical, horizontal, open } = state;

    const handleClick = (newState)=>() => {
        setState({ ...newState, open: true });
    };
  
    const handleClose = (event, reason) => {
        setState({ ...state, open: false });
    };





    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
                Open alert
            </Button> */}
            <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={handleClose}  anchorOrigin={{ vertical, horizontal }} sx={{ width: '25%'}} >
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={severityType}  onClose={handleClose} sx={{ width: '100%'}}>
                    {title && ( <AlertTitle>{title}</AlertTitle>)}
                    {description}
                </Alert>
            </Stack>
            </Snackbar>
        </div>
    );
}

AlertComponent.propTypes={
    title: propTypes.string,
    description: propTypes.string.isRequired,
    severityType: propTypes.string.isRequired,
    autoHideDuration: propTypes.number
}

AlertComponent.defaultProps ={
    description: "Alert description",
    severityType: "info",
    autoHideDuration: null
}
export default AlertComponent;
