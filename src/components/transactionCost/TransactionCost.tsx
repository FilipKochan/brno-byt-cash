import React from 'react'
import CustomInput from '../customInput/CustomInput'
import { InputAdornment } from '@mui/material'

const TransactionCost = () => {
    return (
        <CustomInput fieldName="cost" label="Cena položky" custom={{
            InputProps: { endAdornment: <InputAdornment position="end">Kč</InputAdornment> }
        }} />
    )
}

export default TransactionCost
