export type ItemType = {
    created: string,
    cost: number,
    targetAcc: string[],
    desc: string,
    id?: number,
    _id?: string,
    date: string
}

export type ItemDBType = {
    created: string,
    cost: number,
    desc: string,
    date: string
}

export type AccountType = {
    name: string,
    id: string,
    owesTo: { [key: string]: number }
}

export type AccountsType = AccountType[]

export type OwesTo = { [key: string]: number }

export type TransactionHistory = ItemType[]

export type ActionType = {
    type: string,
    payload?: any
}

export type FormikVals = { [key: string]: string | string[] }

export type NavbarItemType = {
    name: string,
    path: string
}