import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <Box sx={{ 
      display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed', // Position the loader relative to the viewport
        top: '50%', // Position at 50% from the top
        left: '50%', // Position at 50% from the left
        transform: 'translate(-50%, -50%)', // Center it precisely
        zIndex: 999,  
        background: 'rgba(255, 255, 255, 0.7)',
        width: '100%',
        height: '100%', }}>
      <CircularProgress />
    </Box>
  );
}



