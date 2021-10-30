import React, { useMemo, useEffect } from 'react';
import { Paper, Box, useMediaQuery, createTheme } from '@mui/material'
import AddTransaction from '../addTransaction/AddTransaction';
import TransactionsList from '../transactionsList/TransactionsList';
import AccountDetail from '../accountDetail/AccountDetail';
import { Route, Router } from 'react-router'
import history from '../../history'
import './App.scss'
import Header from '../header/Header';
import { ThemeProvider } from '@mui/system';
import Home from '../Home';
import HlacikJeRetard from '../HlacikJeRetard';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    history.push('/brno-byt-cash')
  })

  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Paper className="paper">
          <Box className="root">
            <Header />
            <Route path="/brno-byt-cash/" exact component={Home} />
            <Route path="/brno-byt-cash/add" exact component={AddTransaction} />
            <Route path="/brno-byt-cash/list" exact component={TransactionsList} />
            <Route path="/brno-byt-cash/account" exact component={AccountDetail} />
            <Route path="/brno-byt-cash/hlacikjeretard" exact component={HlacikJeRetard} />
          </Box>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;