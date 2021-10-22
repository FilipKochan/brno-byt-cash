import { Dispatch } from 'react';
import db from '../api'
import { FETCH_ACCOUNTS, FETCHING_ACCOUNTS, FETCH_TRANSACTIONS } from "./types";

export const fetchAccounts = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: FETCHING_ACCOUNTS,
        payload: true
    })

    const res = await db.get('/accounts')

    dispatch({
        type: FETCH_ACCOUNTS,
        payload: res.data
    })
    dispatch({
        type: FETCHING_ACCOUNTS,
        payload: false
    })
}

export const fetchTransactions = () => async (dispatch: Dispatch<any>) => {
    const res = await db.get('/transactionsHistory')

    dispatch({
        type: FETCH_TRANSACTIONS,
        payload: res.data
    })
}