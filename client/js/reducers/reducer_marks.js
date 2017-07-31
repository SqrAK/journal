/**
 * Created by alice on 28.07.17.
 */
import {
    FETCH_MARKS, FETCH_MARKS_SUCCESS, FETCH_MARKS_FAILURE
} from '../actions/marks';


const INITIAL_STATE = { marksList: {marks: {mark:[]}, error:null, loading: false}
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch(action.type) {

        case FETCH_MARKS:// start fetching posts and set loading = true
            return { ...state, marksList: {marks: {mark:[]}, error: null, loading: true} };
        case FETCH_MARKS_SUCCESS:// return list of posts and make loading = false
            return { ...state, marksList: {marks: action.payload, error:null, loading: false} };
        case FETCH_MARKS_FAILURE:// return error and make loading = false
            error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
            return { ...state, marksList: {marks: {mark:[]}, error: error, loading: false} };

        default:
            return state;
    }
}
