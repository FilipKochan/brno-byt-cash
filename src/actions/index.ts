import { Dispatch } from 'react';
import db, { memeapi } from '../api'
import { AccountsType } from '../types';
import {
    FETCH_ACCOUNTS,
    FETCHING_ACCOUNTS,
    FETCH_TRANSACTIONS,
    FETCHING_TRANSACTIONS,
    FETCH_MEME,
    FETCHING_MEME
} from "./types"
import _ from 'lodash'

export const fetchAccounts = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: FETCHING_ACCOUNTS,
        payload: true
    })

    try {
        const res = await db.get('/accounts')
        const accounts_aux = res.data as [{ id: string, _id: string, name: string, owesTo: { [key: string]: number } }]

        const owesTo = await db.get('/owesto') as { data: [{ rootaccount: string, targetaccount: string, ammount: number }] }


        owesTo.data.forEach(row => {
            const rootacc = accounts_aux.find(({ id }) => id === row.rootaccount)
            if (rootacc) {
                rootacc.owesTo[row.targetaccount] = row.ammount
            }
        })

        let accounts: AccountsType = []
        accounts_aux.forEach(account => {
            const filetredOwesTo = owesTo.data.filter(({ rootaccount }) => rootaccount === account.id.toString())
            accounts.push({
                id: account.id,
                name: account.name,
                owesTo: _.mapValues(_.keyBy(filetredOwesTo, 'targetaccount'), 'ammount')
            })
        })

        dispatch({
            type: FETCH_ACCOUNTS,
            payload: accounts
        })

        dispatch({
            type: FETCHING_ACCOUNTS,
            payload: false
        })
    } catch (e) {
        alert('Vyskytla se chyba :(')
    }
}

export const fetchTransactions = () => async (dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: FETCHING_TRANSACTIONS,
            payload: true
        })
        const res = await db.get('/transactionhistory')
        dispatch({
            type: FETCH_TRANSACTIONS,
            payload: _.orderBy(res.data as [{}], ['id'], ['desc'])
        })
        dispatch({
            type: FETCHING_TRANSACTIONS,
            payload: false
        })
    } catch (e) {
        alert('Vyskytla se chyba :(')
    }
}

export const fetchMeme = () => async (dispatch: Dispatch<any>) => {
    dispatch({
        type: FETCHING_MEME,
        payload: true
    })
    const res = await memeapi.get('/gimme') as {
        data: {
            url: string, title: string, postLink: string
        }
    }

    dispatch({
        type: FETCH_MEME,
        payload: {
            url: res.data.url,
            title: res.data.title,
            postLink: res.data.postLink
        }
    })

    dispatch({
        type: FETCHING_MEME,
        payload: false
    })
}