import React from 'react';
import { Box } from '@mui/material'
import AddTransaction from '../addTransaction/AddTransaction';
import TransactionsList from '../transactionsList/TransactionsList';
import { Route, Router } from 'react-router'
import history from '../../history'
import './App.scss'
import Header from '../header/Header';

function App() {
  return (
    <Router history={history}>
      <Box className="root">
        <Header />
        <Route path="/add" exact component={AddTransaction} />
        <Route path="/list" exact component={TransactionsList} />
      </Box>
    </Router>
  );
}

export default App;