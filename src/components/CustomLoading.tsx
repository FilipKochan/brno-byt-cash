import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const CustomLoading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    )
}

export default CustomLoading
