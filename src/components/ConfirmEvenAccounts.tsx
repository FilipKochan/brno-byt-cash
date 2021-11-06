import React from 'react'
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import db from '../api'
import { connect, useDispatch } from 'react-redux'
import { fetchAccounts } from '../actions'
import { FETCHING_ACCOUNTS } from '../actions/types'

type Props = {
    open: boolean,
    acc1Name: string,
    acc1Id: string,
    acc2Name: string,
    acc2Id: string,
    handleClose: () => any,
    fetchAccounts: () => any
}

const ConfirmEvenAccounts: React.FC<Props> = ({
    open,
    acc1Name,
    acc1Id,
    acc2Name,
    acc2Id,
    handleClose,
    fetchAccounts
}: Props) => {
    const dispatch = useDispatch()

    const evenAccounts = async () => {
        dispatch({ type: FETCHING_ACCOUNTS, payload: true })
        handleClose()
        const res_ = await db.get('/owesto')
        const owesToArr = res_.data as [{
            _id: string,
            rootaccount: string,
            targetaccount: string,
            ammount: number
        }]

        const ids = owesToArr.filter(({ rootaccount, targetaccount }) => {
            return (
                rootaccount === acc1Id.toString() && targetaccount === acc2Id.toString()
            ) || (rootaccount === acc2Id.toString() && targetaccount === acc1Id.toString())
        })

        for (let aux of ids) {
            await db.put(`/owesto/${aux._id}`, { ammount: 0 })
        }

        fetchAccounts()
    }


    return (
        <Dialog
            open={open}
        >
            <DialogContent>
                Tímto se vyrovná rozdíl mezi účty {acc1Name} a {acc2Name}. Pokračovat?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>NE</Button>
                <Button onClick={evenAccounts}>ANO</Button>
            </DialogActions>
        </Dialog>
    )
}

export default connect(null, { fetchAccounts })(ConfirmEvenAccounts)