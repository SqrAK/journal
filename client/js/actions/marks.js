/**
 * Created by alice on 28.07.17.
 */
import axios from 'axios';

export const FETCH_MARKS = 'FETCH_MARKS';
export const FETCH_MARKS_SUCCESS = 'FETCH_MARKS_SUCCESS';
export const FETCH_MARKS_FAILURE = 'FETCH_MARKS_FAILURE';


export function fetchMarks(subjectName, userid='') {
    let url = `http://localhost:3000/api/v1/mark/`+ subjectName;
    if(userid)
        url +=`/${userid}`;
    const request = axios({
        method: 'get',
        url: url,
        headers: []
    });

    return {
        type: FETCH_MARKS,
        payload: request
    };
}

export function fetchMarksSuccess(posts) {
    return {
        type: FETCH_MARKS_SUCCESS,
        payload: posts
    };
}

export function fetchMarksFailure(error) {
    return {
        type: FETCH_MARKS_FAILURE,
        payload: error
    };
}


