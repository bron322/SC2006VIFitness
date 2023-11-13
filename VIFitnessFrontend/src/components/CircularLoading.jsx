import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./styles/BodyComponent.css"

export default function CircularIndeterminate() {
  return (
    <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2000', 
    background: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    height: '100%',
    }}>
      <CircularProgress />
    </Box>
  );
}



