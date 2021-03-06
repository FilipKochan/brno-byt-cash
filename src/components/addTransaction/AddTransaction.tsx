import React, { useEffect, useMemo, useState } from 'react'
import AccountsSelect from '../accountsSelect/AccountsSelect'
import { Formik, Form } from 'formik'
import { Button, Box } from '@mui/material'
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
import { AxiosResponse } from 'axios'
import CustomLoading from '../CustomLoading'

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
            let result: AccountsType = []
            targetAcc.forEach(acc => {
                const recipient = filtered.find(({ id }) => {
                    return id.toString() === acc.toString()
                })
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
                targetAcc: (formVals.targetAccounts as string[]),
                desc: formVals.description as string,
                date: new Date().toString()
            }

            const res: AxiosResponse<ItemType> = await db.post('/transactionhistory', data)
            if (res.status !== 201) {
                return
            }
            const transactionId = res.data.id
            for (let t of data.targetAcc) {
                db.post('/itemaccounts', {
                    transactionid: transactionId,
                    accountid: t
                })
            }

            const newAccounts = getNewAccounts(data)

            const res_ = await db.get('/owesto')
            const owesToArr = res_.data as [{
                _id: string,
                rootaccount: string,
                targetaccount: string,
                ammount: number
            }]

            for (let acc of newAccounts) {
                _.map(acc.owesTo, (val, key) => {
                    const id = owesToArr.find(({ rootaccount, targetaccount }) => {
                        return rootaccount === acc.id.toString() && targetaccount === key
                    })?._id

                    if (id) {
                        db.put(`/owesto/${id}`, { ammount: val })
                    }
                })
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
            errors = { ...errors, account: "Vyber ????et" }
        }

        if (!vals.description) {
            errors = { ...errors, description: "Popis je nutn??" }
        }

        if (vals.description?.trim().length < 2 || vals.description?.trim().length > 100) {
            errors = { ...errors, description: "Chybn?? d??lka popisu" }
        }

        if (!(/^-?\d+$/.test(vals.cost))) {
            errors = { ...errors, cost: "Cena mus?? b??t ????slo" }
        }

        if (!vals.targetAccounts.length) {
            errors = { ...errors, targetAccounts: "Je pot??eba zvolit alespo?? jeden ????et." }
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
                                        ? <CustomLoading />
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
