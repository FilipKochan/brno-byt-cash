import { combineReducers } from 'redux'
import accountsReducer from './accountReducer'

export default combineReducers({
    db: accountsReducer
})