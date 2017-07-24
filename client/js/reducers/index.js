import { combineReducers } from 'redux'
import page from './page'
import user from './user'
import subject from './subject'
import mark from './mark'

export default combineReducers({
  page,
  user,
  subject,
  mark
})
