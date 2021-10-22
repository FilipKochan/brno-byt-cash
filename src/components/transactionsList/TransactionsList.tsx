import {
    CircularProgress,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from '@mui/material'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchTransactions, fetchAccounts } from '../../actions'
import { TransactionHistory } from '../../types'
import _ from 'lodash'

type Props = {
    fetchTransactions: () => any,
    fetchAccounts: () => any,
    transactions: TransactionHistory,
    accountNames: { [key: number]: string }
}

const TransactionsList: React.FC<Props> = ({
    fetchTransactions,
    fetchAccounts,
    transactions,
    accountNames
}: Props) => {

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    useEffect(() => {
        fetchAccounts()
    }, [fetchAccounts])

    return (
        transactions
            ? <TableContainer sx={{ maxWidth: 700, margin: 'auto' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Z účtu</TableCell>
                            <TableCell>Na účty</TableCell>
                            <TableCell>Částka</TableCell>
                            <TableCell>Popis</TableCell>
                            <TableCell>Datum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{accountNames[parseInt(item.created)]}</TableCell>
                                <TableCell>{item.targetAcc.map(id => accountNames[id]).join(', ')}</TableCell>
                                <TableCell>{item.cost} Kč</TableCell>
                                <TableCell>{item.desc}</TableCell>
                                <TableCell>__?__</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            : <CircularProgress sx={{ margin: 'auto' }} />
    )
}

const mapStateToProps = (state: any) => {
    return {
        transactions: state.db.transactions?.reverse(),
        accountNames: _.mapValues(_.keyBy(state.db.accounts, 'id'), 'name')
    }
}
export default connect(mapStateToProps, { fetchTransactions, fetchAccounts })(TransactionsList)
