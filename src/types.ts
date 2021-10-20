export type ItemType = {
    created: number,
    cost: number,
    targetAcc: number[],
    desc: string
}

export type AccountType = {
    name: string,
    id: number,
    owesTo: { [key: number]: number }
}

export type AccountsType = AccountType[]

export type OwesTo = { [key: string]: number }

export type TransactionHistory = ItemType[]

export type ActionType = {
    type: string,
    payload?: any
}

export type FormikVals = { [key: string]: string | string[] }