import { combineReducers } from 'redux'
import dbReducer from './dbReducer'
import memeReducer from './memeReducer'

export default combineReducers({
    db: dbReducer,
    meme: memeReducer,
})