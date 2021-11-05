import React from 'react'
import { connect } from 'react-redux'
import { fetchAccounts } from '../../actions'
import { Field } from 'formik'
import { AccountsType } from '../../types'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from '@mui/material'
import { Box } from '@mui/system'

type Props = {
    values: any,
    error: string
    fetchAccounts: any,
    accounts: AccountsType
}

const TargetAccounts: React.FC<Props> = ({ values, error, accounts }: Props) => {
    return (
        <Box sx={{ width: '100%', padding: '0 1rem' }}>
            <FormControl error={error ? true : false}>
                <FormLabel component="legend">Rozdělit mezi účty:</FormLabel>
                <FormGroup sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: [0, '3rem']
                }}>
                    {accounts.map(({ name, id }) => (
                        <Field
                            key={id}
                            name='targetAccounts'
                            value={id}
                            type="checkbox"
                            component={({ field }: any) => {
                                return (
                                    <FormControlLabel
                                        control={
                                            <Checkbox {...field} color='primary' checked={values.includes(id.toString())} />
                                        }
                                        label={name}
                                    />
                                )
                            }}
                        />
                    ))}
                </FormGroup>
                {error !== undefined && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </Box>
    )
}

const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts }
}

export default connect(mapStateToProps, { fetchAccounts })(TargetAccounts)
