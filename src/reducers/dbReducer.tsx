import { ActionType } from "../types"
import { FETCHING_ACCOUNTS, FETCHING_TRANSACTIONS, FETCH_ACCOUNTS, FETCH_TRANSACTIONS } from "../actions/types"

const INITIAL_STATE = {
    accounts: []
}

const dbReducer = (state = INITIAL_STATE, action: ActionType) => {
    switch (action.type) {
        case FETCH_ACCOUNTS:
            return { ...state, accounts: action.payload }
        case FETCHING_ACCOUNTS:
            return { ...state, fetchingAccounts: action.payload }
        case FETCH_TRANSACTIONS:
            return { ...state, transactions: action.payload }
        case FETCHING_TRANSACTIONS:
            return { ...state, fetchingTransactions: action.payload }
        default:
            return state
    }
}

export default dbReducer