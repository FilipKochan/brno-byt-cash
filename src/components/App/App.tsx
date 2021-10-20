import React from 'react';
import { Box, Typography } from '@mui/material'
import AddTransaction from '../addTransaction/AddTransaction';
import './App.scss'

function App() {
  return (
    <Box className="root">
      <Typography component='h1' sx={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>Where's my money?</Typography>
      <AddTransaction />
    </Box>
  );
}

export default App;