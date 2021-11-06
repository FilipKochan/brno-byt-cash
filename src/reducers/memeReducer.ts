import { ActionType } from "../types"
import { FETCHING_MEME, FETCH_MEME } from "../actions/types";

const INITIAL_STATE = {
    url: '',
    title: '',
    postLink: '',
    fetching: true
}

const memeReducer = (state = INITIAL_STATE, action: ActionType) => {
    switch (action.type) {
        case FETCH_MEME:
            return {
                ...state,
                ...action.payload
            }
        case FETCHING_MEME: {
            return {
                ...state,
                fetching: action.payload
            }
        }

        default:
            return state
    }
}
export default memeReducer