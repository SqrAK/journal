/**
 * Created by alice on 29.07.17.
 */
import {
    FETCH_SUBJECTS, FETCH_SUBJECTS_SUCCESS, FETCH_SUBJECTS_FAILURE
} from '../actions/subjects';


const INITIAL_STATE = { subjectsList: {subjects: {subject:[]}, error:null, loading: false}
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case FETCH_SUBJECTS:// start fetching posts and set loading = true
            return { ...state, subjectsList: {subjects: {subject:[]}, error: null, loading: true} };
        case FETCH_SUBJECTS_SUCCESS:// return list of posts and make loading = false
            return { ...state, subjectsList: {subjects: action.payload, error:null, loading: false} };
        case FETCH_SUBJECTS_FAILURE:// return error and make loading = false
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, subjectsList: {subjects: {subject:[]}, error: error, loading: false} };

        default:
            return state;
    }
}