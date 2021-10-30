import React from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './header.scss'

const Header = () => {
    return (
        <Box>
            <Box className="navbar">
                <Link to='/brno-byt-cash/'>Domů</Link>
                <Link to='/brno-byt-cash/add'>Přidat položku</Link>
                <Link to='/brno-byt-cash/list'>Historie transakcí</Link>
                <Link to='/brno-byt-cash/account'>Výpis účtu</Link>
            </Box>
            <Typography component='h1' sx={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '2rem', marginTop: '5rem' }}>Where's my money?</Typography>
        </Box>
    )
}

export default Header
