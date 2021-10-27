import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { Box, Button } from '@mui/material'
import { AccountsType } from '../../types'
import _ from 'lodash'
import './accountInfo.scss'


type Props = {
    accountId: string,
    accounts: AccountsType
}

const AccountInfo: React.FC<Props> = ({ accountId, accounts }: Props) => {
    const account = useMemo(() => {
        return accounts.find(({ id }) => parseInt(accountId) === id)
    }, [accounts, accountId])

    const countOwes = (accId: string, val: number) => {
        if (!account) return

        const res = accounts.find(({ id }) => parseInt(accId) === id)?.owesTo[account?.id]
        if (res === undefined) return
        return val - res
    }

    const getAccountName = (accId: string) => {
        return accounts.find(({ id }) => parseInt(accId) === id)?.name
    }

    return (
        account !== undefined
            ? <Box>
                {account.name}
                <Box className="accounts-box">
                    {_.map(account.owesTo, (val, key) => {
                        const owes = countOwes(key, val)
                        return (
                            <Box key={key} className="account-row">
                                <Box>Účtu <span className="highlight">{getAccountName(key)}</span> dluží <span className={'highlight ' + (owes && owes > 0 ? 'owes-more' : 'owes-less')}>{owes} Kč</span>.</Box>
                                <Button>Vyrovnat účty</Button>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            : <Box>Vyskytla se chyba...</Box>
    )
}

const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts }
}

export default connect(mapStateToProps)(AccountInfo)
