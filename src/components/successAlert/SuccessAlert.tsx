import React from 'react'
import { Alert, Box, Button } from '@mui/material'

type Props = {
    handleNextTransaction: () => void,
    success?: boolean
}

const SuccessAlert: React.FC<Props> = ({ handleNextTransaction, success }: Props) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', justifyContent: 'center', alignItems: 'center' }}>
            {success
                ? <Alert severity="success" >Přidání proběhlo úspěšně!</Alert>
                : <Alert severity="error">Něco se pokazilo, zkus to prosím znovu</Alert>}
            <Button onClick={handleNextTransaction}>Další transakce</Button>
        </Box>
    )
}

export default SuccessAlert