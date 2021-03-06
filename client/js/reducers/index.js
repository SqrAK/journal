import { combineReducers } from 'redux';
import StudentsReducer from './reducer_students';
import MarksReducer from './reducer_marks';
import SubjectsReducer from './reducer_subjects';
import UserReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  students: StudentsReducer,
  marks: MarksReducer,
  subjects: SubjectsReducer,
  form: formReducer // <-- redux-form
});

export default rootReducer;
