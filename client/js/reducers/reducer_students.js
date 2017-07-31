/**
 * Created by alice on 28.07.17.
 */
import {
    FETCH_STUDENTS, FETCH_STUDENTS_SUCCESS, FETCH_STUDENTS_FAILURE
} from '../actions/students';


const INITIAL_STATE = { studentsList: {students: {user:[]}, error:null, loading: false}
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case FETCH_STUDENTS:// start fetching posts and set loading = true
            return { ...state, studentsList: {students:{user:[]}, error: null, loading: true} };
        case FETCH_STUDENTS_SUCCESS:// return list of posts and make loading = false
            return { ...state, studentsList: {students: action.payload, error:null, loading: false} };
        case FETCH_STUDENTS_FAILURE:// return error and make loading = false
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, studentsList: {students: {user:[]}, error: error, loading: false} };
        default:
            return state;
    }
}
