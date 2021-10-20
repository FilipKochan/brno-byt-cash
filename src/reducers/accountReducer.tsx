import { ActionType } from "../types"
import { FETCH_ACCOUNTS } from "../actions/types"

const INITIAL_STATE = {
    accounts: []
}

const accountsReducer = (state = INITIAL_STATE, action: ActionType) => {
    switch (action.type) {
        case FETCH_ACCOUNTS:
            return { ...state, accounts: action.payload }
        default:
            return state
    }
}

export default accountsReducer