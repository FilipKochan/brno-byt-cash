import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { AccountsType, FormikVals } from '../../types'
import './sumTransaction.scss'

type Props = {
    accounts: AccountsType,
    formValues: FormikVals
}

const SumTransaction: React.FC<Props> = ({ accounts, formValues }: Props) => {
    const selectedAccounts = useMemo((): string => {
        return (
            formValues.targetAccounts.length === accounts.length
                ? "všechny účty"
                : `účty ${accounts.filter(({ id }) => formValues.targetAccounts.includes(id.toString())).map(({ name }) => name).join(', ')}`
        )
    }, [accounts, formValues.targetAccounts])

    const senderAccount = useMemo((): string => {
        if (accounts === undefined) {
            return ''
        }
        return accounts.filter(({ id }) => formValues.account.toString() === id.toString())[0].name
    }, [accounts, formValues.account])

    return (
        <div className="sumRoot">
            Částka <span className="highlight">{formValues.cost} Kč</span>&nbsp;za položku <span className="highlight">{formValues.description}</span>&nbsp;bude z účtu <span className="highlight">{senderAccount}</span>&nbsp;rozdělena mezi <span className="highlight">{selectedAccounts}</span>.
        </div>
    )
}
const mapStateToProps = (state: any) => {
    return { accounts: state.db.accounts }
}

export default connect(mapStateToProps)(SumTransaction)
