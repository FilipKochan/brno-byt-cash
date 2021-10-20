import { Dispatch } from 'react';
import db from '../api'
import { FETCH_ACCOUNTS } from "./types";

export const fetchAccounts = () => async (dispatch: Dispatch<any>) => {
    const res = await db.get('/accounts')

    dispatch({
        type: FETCH_ACCOUNTS,
        payload: res.data
    })
}