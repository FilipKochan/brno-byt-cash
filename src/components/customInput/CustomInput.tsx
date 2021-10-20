import React from 'react'
import { Field } from 'formik'
import { FormControl, FormHelperText, TextField } from '@mui/material'

type Props = {
    fieldName: string,
    label: string,
    custom?: any
}

const CustomInput: React.FC<Props> = ({ fieldName, label, custom }: Props) => {
    return (
        <Field name={fieldName}>
            {({ field, meta }: any) => {
                const isError = meta.touched && meta.error?.length > 0
                return (
                    <FormControl error={isError} fullWidth>
                        <TextField
                            {...field}
                            {...custom}
                            label={label}
                            id={fieldName}
                            error={isError}
                        />
                        {isError && <FormHelperText>{meta.error}</FormHelperText>}
                    </FormControl>
                )
            }}
        </Field>
    )
}

export default CustomInput
