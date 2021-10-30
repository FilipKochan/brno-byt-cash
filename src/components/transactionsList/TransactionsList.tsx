import {
    Box,
    Button,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchTransactions, fetchAccounts } from '../../actions'
import { TransactionHistory } from '../../types'
import _ from 'lodash'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'
import CustomLoading from '../CustomLoading'

type Props = {
    fetchTransactions: () => any,
    fetchAccounts: () => any,
    transactions: TransactionHistory,
    accountNames: { [key: string]: string },
    fetchingTransactions: boolean,
    fetchingAccounts: boolean
}

const TransactionsList: React.FC<Props> = ({
    fetchTransactions,
    fetchAccounts,
    transactions,
    accountNames,
    fetchingTransactions,
    fetchingAccounts
}: Props) => {
    const [offset, setOffset] = useState<number>(0)
    const limit = 10

    useEffect(() => {
        fetchTransactions()
    }, [fetchTransactions])

    useEffect(() => {
        fetchAccounts()
    }, [fetchAccounts])

    return (
        transactions && !fetchingAccounts && !fetchingTransactions
            ? (<Box sx={{ maxWidth: 700, margin: 'auto' }}>
                <TableContainer component={Paper}>
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
                            {transactions.slice(offset, limit + offset).map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{accountNames[item.created]}</TableCell>
                                    <TableCell>{item.targetAcc.map(id => accountNames[id]).join(', ')}</TableCell>
                                    <TableCell>{item.cost} Kč</TableCell>
                                    <TableCell>{item.desc}</TableCell>
                                    <TableCell>{format(new Date(item.date), 'do LLLL yyyy', { locale: cs })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBlock: '1rem'
                }}>
                    <Button
                        onClick={() => setOffset(Math.max(0, offset - limit))}
                        disabled={offset === 0}
                    >Předchozí</Button>
                    <Button
                        disabled={offset + limit > transactions.length - 1}
                        onClick={() => setOffset(Math.min(transactions.length - 1, offset + limit))}
                    >Další</Button>
                </Box>
            </Box>)
            : <CustomLoading />
    )
}

const mapStateToProps = (state: any) => {
    return {
        transactions: state.db.transactions,
        fetchingTransactions: state.db.fetchingTransactions,
        fetchingAccounts: state.db.fetchingAccounts,
        accountNames: _.mapValues(_.keyBy(state.db.accounts, 'id'), 'name')
    }
}
export default connect(mapStateToProps, { fetchTransactions, fetchAccounts })(TransactionsList)
