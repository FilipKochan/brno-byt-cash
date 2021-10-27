import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAccounts } from '../../actions'
import { AccountsType } from '../../types'
import AccountInfo from '../accountInfo/AccountInfo'
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText
} from '@mui/material'

type Props = {
    fetchAccounts: () => any,
    accounts: AccountsType
}

const AccountDetail: React.FC<Props> = ({ fetchAccounts, accounts }: Props) => {
    const [selectedAcccount, setSelectedAccount] = useState<string>('69')

    useEffect(() => {
        fetchAccounts()
    }, [fetchAccounts])

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto' }}>
            <FormControl fullWidth>
                <InputLabel id="account">Účet</InputLabel>
                <Select
                    label="account"
                    labelId="account"
                    value={selectedAcccount}
                    onChange={e => setSelectedAccount(e.target.value)}
                >
                    {accounts.map(({ name, id }) => (
                        <MenuItem
                            key={id}
                            value={id}
                        >{name}</MenuItem>
                    ))}
                </Select>
                <FormHelperText>Zvolte účet, jehož detail chcete zobrazit.</FormHelperText>
                {selectedAcccount !== undefined && <AccountInfo accountId={selectedAcccount} />}
            </FormControl>
        </Box>
    )
}

const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts }
}

export default connect(mapStateToProps, { fetchAccounts })(AccountDetail)