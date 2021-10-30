import { ActionType } from "../types"
import { FETCH_MEME } from "../actions/types";

const INITIAL_STATE = {
    url: '',
    title: '',
    postLink: '',
}

const memeReducer = (state = INITIAL_STATE, action: ActionType) => {
    switch (action.type) {
        case FETCH_MEME:
            return {
                ...state,
                url: action.payload.url, title: action.payload.title, postLink: action.payload.postLink
            }

        default:
            return state
    }
}
export default memeReducer