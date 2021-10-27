import React, { useEffect, useMemo, useState } from 'react'
import AccountsSelect from '../accountsSelect/AccountsSelect'
import { Formik, Form } from 'formik'
import { Button, Box, CircularProgress } from '@mui/material'
import { AccountsType, FormikVals, ItemType } from '../../types'
import { fetchAccounts } from '../../actions'
import { connect } from 'react-redux'
import './AddTransaction.scss'
import TransactionDescription from '../transactionDescription/TransactionDescription'
import TransactionCost from '../transactionCost/TransactionCost'
import TargetAccounts from '../targetAccounts/TargetAccounts'
import SumTransaction from '../sumTransaction/SumTransaction'
import db from '../../api'
import _ from 'lodash'
import SuccessAlert from '../successAlert/SuccessAlert'

type Props = {
    fetchAccounts: () => any,
    accounts: AccountsType,
    fetchingAccounts: boolean
}

const AddTransaction: React.FC<Props> = ({ fetchAccounts, accounts, fetchingAccounts }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submittedSuccessfully,
        setSubmittedSuccesfully] = useState(false)
    const [submittedWithError, setSubmittedwithError] = useState(false)
    const [formVals, setFormVals] = useState<FormikVals>({})

    useEffect(() => {
        fetchAccounts()
    }, [fetchAccounts])

    const handleNextTransaction = () => {
        setIsSubmitting(false)
        setSubmittedSuccesfully(false)
        setSubmittedwithError(false)
    }

    const handleFormSubmit = async (vals: FormikVals) => {
        console.log('started once')
        setFormVals(vals)
        setIsSubmitting(true)
        fetchAccounts()
    }

    useEffect(() => {
        const getNewAccounts = ({ targetAcc, cost, created }: ItemType): AccountsType => {
            const itemCost = Math.floor(cost / targetAcc.length)

            const filtered = accounts.filter(({ id }) => {
                return id.toString() !== created.toString()
            })

            let accounts_aux = _.cloneDeep(filtered)
            let result: AccountsType = []
            targetAcc.forEach(acc => {
                const recipient = accounts_aux.find(({ id }) => id === acc)
                if (recipient) {
                    recipient.owesTo[created] = (recipient.owesTo[created] ?? 0) + itemCost
                    result = [...result, recipient]
                }
            })
            return result
        }

        const submitFormValues = async () => {
            const data: ItemType = {
                created: (formVals.account as string),
                cost: parseInt(formVals.cost as string),
                targetAcc: (formVals.targetAccounts as string[]).map(id => parseInt(id)),
                desc: formVals.description as string,
                date: new Date().toString()
            }

            const res = await db.post('/transactionsHistory', data)
            if (res.status !== 201) {
                return
            }

            const newAccounts = getNewAccounts(data)
            for (let newAccount of newAccounts) {
                const accPutRes = await db.put(`/accounts/${newAccount.id}`, newAccount)
                if (accPutRes.status !== 200) {
                    return
                }
            }
            setIsSubmitting(false)
            setSubmittedSuccesfully(true)
        }

        if (!fetchingAccounts && isSubmitting) {
            submitFormValues()
        }
        // eslint-disable-next-line
    }, [fetchingAccounts])

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
        <Box sx={{ maxWidth: 400, margin: 'auto' }}>
            {submittedSuccessfully && <SuccessAlert
                success
                handleNextTransaction={handleNextTransaction}
            />}

            {submittedWithError && <SuccessAlert
                handleNextTransaction={handleNextTransaction}
            />}

            {!submittedSuccessfully && !submittedWithError && (
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
            )}
        </Box>
    )
}

const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts, fetchingAccounts: state.db.fetchingAccounts }
}

export default connect(mapStateToProps, { fetchAccounts })(AddTransaction)
