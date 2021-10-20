import React from 'react'
import { connect } from 'react-redux'
import { AccountsType } from '../../types'
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material'
import { Field } from 'formik'

type Props = {
    accounts: AccountsType
}

const AccountsSelect: React.FC<Props> = ({ accounts }) => {
    const renderAccounts = () => {
        return (
            <Field name="account">
                {({ field, meta }: any) => (
                    <FormControl error={meta.touched && meta.error?.length > 0} fullWidth>
                        <InputLabel id="account">Účet</InputLabel>
                        <Select
                            {...field}
                            label="account"
                            labelId="account"
                            value={field.value}
                        >
                            {accounts.map(({ name, id }) => (
                                <MenuItem
                                    key={id}
                                    value={id}
                                >{name}</MenuItem>
                            ))}
                        </Select>
                        {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                    </FormControl>
                )}

            </Field>
        )
    }

    return (
        renderAccounts()
    )
}

const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts }
}

export default connect(mapStateToProps)(AccountsSelect)
