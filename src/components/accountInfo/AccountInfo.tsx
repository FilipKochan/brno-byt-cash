import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { AccountsType } from '../../types'
import ConfirmEvenAccounts from '../ConfirmEvenAccounts'
import CustomLoading from '../CustomLoading'
import _ from 'lodash'
import './accountInfo.scss'


type Props = {
    accountId: string,
    accounts: AccountsType,
    fetchingAccounts: boolean
}

const AccountInfo: React.FC<Props> = ({
    accountId, accounts, fetchingAccounts
}: Props) => {
    const [visibleDialog, setVisibleDialog] = useState('')

    const account = useMemo(() => {
        return accounts.find(({ id }) => accountId.toString() === id.toString())
    }, [accounts, accountId])

    const countOwes = (accId: string, val: number) => {
        if (!account) return

        const res = accounts.find(({ id }) => accId.toString() === id.toString())?.owesTo[account.id]
        if (res === undefined) return
        return val - res
    }

    const getAccountName = (accId: string) => {
        return accounts.find(({ id }) => accId.toString() === id.toString())?.name
    }

    return (
        account !== undefined && !fetchingAccounts
            ? <Box>
                <Typography
                    sx={{ textAlign: 'center' }}
                    component='h3'
                    variant='h4'
                    className="account-title"
                >{account.name}</Typography>
                <Box className="accounts-box">
                    {_.map(account.owesTo, (val, key) => {
                        const owes = countOwes(key, val)
                        return (
                            <Box key={key} className="account-row">
                                <Box>Účtu <span className="highlight">{getAccountName(key)}</span> dluží <span className={'highlight ' + (owes && owes > 0 ? 'owes-more' : 'owes-less')}>{owes} Kč</span>.</Box>
                                <Button onClick={() => setVisibleDialog(key)}>Vyrovnat účty</Button>
                                <ConfirmEvenAccounts
                                    open={visibleDialog === key}
                                    acc1Id={account.id}
                                    acc1Name={account.name}
                                    acc2Id={key}
                                    acc2Name={getAccountName(key) || ''}
                                    handleClose={() => setVisibleDialog('')}
                                />
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            : <CustomLoading />
    )
}

const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts, fetchingAccounts: state.db.fetchingAccounts }
}

export default connect(mapStateToProps)(AccountInfo)
