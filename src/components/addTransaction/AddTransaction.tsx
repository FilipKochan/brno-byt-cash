import React, { useEffect, useMemo, useState } from 'react'
import AccountsSelect from '../accountsSelect/AccountsSelect'
import { Formik, Form } from 'formik'
import { Button, Box, CircularProgress } from '@mui/material'
import { AccountsType, AccountType, FormikVals, ItemType } from '../../types'
import { fetchAccounts } from '../../actions'
import { connect } from 'react-redux'
import './AddTransaction.scss'
import TransactionDescription from '../transactionDescription/TransactionDescription'
import TransactionCost from '../transactionCost/TransactionCost'
import TargetAccounts from '../targetAccounts/TargetAccounts'
import SumTransaction from '../sumTransaction/SumTransaction'
import db from '../../api'
import _ from 'lodash'

type Props = {
    fetchAccounts: () => any,
    accounts: AccountsType
}

const AddTransaction: React.FC<Props> = ({ fetchAccounts, accounts }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submittedWithError, setSubmittedwithError] = useState(false)

    useEffect(() => {
        fetchAccounts()
    }, [fetchAccounts])

    const handleFormSubmit = async (vals: FormikVals) => {
        setIsSubmitting(true)
        const data: ItemType = {
            created: parseInt(vals.account as string),
            cost: parseInt(vals.cost as string),
            targetAcc: (vals.targetAccounts as string[]).map(id => parseInt(id)),
            desc: vals.description as string
        }

        const res = await db.post('/transactionsHistory', data)
        if (res.status !== 201) {
            return
        }


        // if (accRes.status !== 200) {
        //     return
        // }
        setIsSubmitting(false)
    }

    const getNewAccounts = ({ targetAcc, cost, created }: ItemType): AccountsType => {
        const itemCost = Math.floor(cost / targetAcc.length)

        let accounts_aux = _.cloneDeep(accounts.filter(({ id }) => id !== created))

        targetAcc.forEach(acc => {
            const recipient = accounts_aux.find(({ id }) => id === acc)
            if (recipient) {
                recipient.owesTo[created] = (recipient.owesTo[created] ?? 0) + itemCost
                accounts_aux[acc] = recipient
            }
        })

        return accounts_aux
    }

    const isFilled = (values: FormikVals) => {
        for (let key of Object.keys(values)) {
            if (values[key].length === 0) {
                return false
            }
        }
        return true
    }

    const initialValues = useMemo(() => {
        return {
            account: '',
            description: '',
            cost: '',
            targetAccounts: accounts.map(({ id }) => id.toString())
        }
    }, [accounts])

    const validate = (vals: any) => {
        let errors = {}

        if (!vals.account) {
            errors = { ...errors, account: "Vyber účet" }
        }

        if (!vals.description) {
            errors = { ...errors, description: "Popis je nutný" }
        }

        if (vals.description?.trim().length < 2 || vals.description?.trim().length > 100) {
            errors = { ...errors, description: "Chybná délka popisu" }
        }

        if (!(/^-?\d+$/.test(vals.cost))) {
            errors = { ...errors, cost: "Cena musí být číslo" }
        }

        if (!vals.targetAccounts.length) {
            errors = { ...errors, targetAccounts: "Je potřeba zvolit alespoň jeden účet." }
        }
        return errors
    }

    return (
        <Formik enableReinitialize initialValues={initialValues} onSubmit={handleFormSubmit} validate={validate}>
            {({ values, errors }: any) => {
                return (
                    <Form>
                        <Box className="root" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <AccountsSelect />
                            <TransactionDescription />
                            <TransactionCost />
                            <TargetAccounts values={values.targetAccounts} error={errors.targetAccounts} />
                            {isFilled(values) && !Object.keys(errors).length && <SumTransaction formValues={values} />}
                            {isSubmitting
                                ? <CircularProgress />
                                : <Button type="submit">
                                    Potvrdit
                                </Button>}
                        </Box>
                    </Form>
                )
            }}
        </Formik>
    )
}

const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts }
}

export default connect(mapStateToProps, { fetchAccounts })(AddTransaction)
