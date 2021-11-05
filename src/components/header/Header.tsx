import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Icon, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './header.scss'

const Header = () => {
    const [collapsed, setCollapsed] = useState(true)

    const linkStyle = {
        display: [collapsed ? 'none' : 'inline', 'flex-item'],
        marginLeft: ['1rem'],
    }
    return (
        <Box>
            <Box className="navbar" sx={{
                flexDirection: ['column', 'row'],
                '& a': { ...linkStyle }
            }}>
                <Icon sx={{
                    display: ['inline', 'none'],
                    alignSelf: 'flex-end',
                    cursor: 'hover',
                    marginRight: '1rem',
                    fill: '#000'
                }} component={Menu} onClick={() => setCollapsed(!collapsed)} />
                <Link onClick={() => setCollapsed(true)} to='/'>Domů</Link>
                <Link onClick={() => setCollapsed(true)} to='/add'>Přidat položku</Link>
                <Link onClick={() => setCollapsed(true)} to='/list'>Historie transakcí</Link>
                <Link onClick={() => setCollapsed(true)} to='/account'>Výpis účtu</Link>
            </Box>
            <Typography component='h1' sx={{
                textAlign: 'center',
                fontSize: ['1.5rem', '2.5rem'],
                fontWeight: 'bold',
                marginBottom: '2rem',
                marginTop: '5rem'
            }}>Where's my money?</Typography>
        </Box>
    )
}

export default Header
