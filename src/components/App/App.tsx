import React, { useMemo } from 'react';
import { Paper, Box, useMediaQuery, createTheme } from '@mui/material'
import AddTransaction from '../addTransaction/AddTransaction';
import TransactionsList from '../transactionsList/TransactionsList';
import AccountDetail from '../accountDetail/AccountDetail';
import { Route, Router } from 'react-router'
import history from '../../history'
import './App.scss'
import Header from '../header/Header';
import { ThemeProvider } from '@mui/system';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
            <Route path="/add" exact component={AddTransaction} />
            <Route path="/list" exact component={TransactionsList} />
            <Route path="/account" exact component={AccountDetail} />
          </Box>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;