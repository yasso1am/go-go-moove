import { combineReducers } from 'redux'
import user from './user'
import auth from './auth'

const rootReducer = combineReducers({
  auth,
  user,
})

export default rootReducer
