import React, { useState, useMemo } from 'react'
import { Box } from '@mui/system'
import { ClickAwayListener, Icon, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './header.scss'
import { NavbarItemType } from '../../types'



const navbarItems: NavbarItemType[] = [
    { name: 'Domů', path: '/' },
    { name: 'Přidat položku', path: '/add' },
    { name: 'Historie transakcí', path: '/list' },
    { name: 'Výpis účtu', path: '/account' },
]

const Header = () => {
    const [collapsed, setCollapsed] = useState(true)

    const linkStyle = {
        display: [collapsed ? 'none' : 'inline', 'flex-item'],
        marginLeft: ['1rem'],
    }

    const renderedItems = useMemo(() => navbarItems.map(({ name, path }) => (
        <Link
            key={path}
            onClick={() => setCollapsed(true)}
            to={path}>{name}</Link>
    )), [])

    return (
        <ClickAwayListener onClickAway={() => setCollapsed(true)}>
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
                    {renderedItems}
                </Box>
                <Typography component='h1' sx={{
                    textAlign: 'center',
                    fontSize: ['1.5rem', '2.5rem'],
                    fontWeight: 'bold',
                    marginBottom: '2rem',
                    marginTop: '5rem'
                }}>Where's my money?</Typography>
            </Box>
        </ClickAwayListener>
    )
}

export default Header
