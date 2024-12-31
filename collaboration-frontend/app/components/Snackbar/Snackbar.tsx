// SnackbarComponent.tsx
import React from 'react';
import { Snackbar, SnackbarContent, IconButton, Button } from '@mui/material';
// import { Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { hideMessageAction } from '../../redux/actions/message.action';
import { RootState } from '@/app/redux/store';


const SnackbarComponent = () => {
  const dispatch = useDispatch();
  
  const state = useSelector((state: RootState) => state.error.state); 
  const options = useSelector((state: RootState) => state.error.options); 
  console.log("options",options);
  
  const snackBarStyles = (variant: string) => {
    switch (variant) {
      case 'error':
        return { backgroundColor: '#f44336', color: '#fff' };  // Red
      case 'warning':
        return { backgroundColor: '#ff9800', color: '#fff' };  // Orange
      case 'info':
        return { backgroundColor: '#2196f3', color: '#fff' };  // Blue
      case 'success':
        return { backgroundColor: '#4caf50', color: '#fff' };  // Green
      default:
        return { backgroundColor: '#2196f3', color: '#fff' };  // Default to blue
    }
  };

  return (
    <Snackbar
      open={state}
      onClose={() => dispatch(hideMessageAction())}
      autoHideDuration={6000}  // Automatically hide the message after 6 seconds
    >
      <SnackbarContent
        style={snackBarStyles(options?.variant || 'info')}
        message={options?.message}
        action={
          <>
            <Button
              color="inherit"
              size="small"
              onClick={() => dispatch(hideMessageAction())}
            >
              Close
            </Button>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => dispatch(hideMessageAction())}
            >
              {/* <CloseIcon fontSize="small" /> */}
            </IconButton>
          </>
        }
      />
    </Snackbar>
  );
};

export default SnackbarComponent;
