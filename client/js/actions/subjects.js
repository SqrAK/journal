/**
 * Created by alice on 29.07.17.
 */
import axios from 'axios';

//Post list
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';
export const FETCH_SUBJECTS_FAILURE = 'FETCH_SUBJECTS_FAILURE';


export function fetchSubjects() {
    const request = axios({
        method: 'get',
        url: `http://localhost:3000/api/v1/subject`,
        headers: []
    });

    return {
        type: FETCH_SUBJECTS,
        payload: request
    };
}

export function fetchSubjectsSuccess(posts) {
    return {
        type: FETCH_SUBJECTS_SUCCESS,
        payload: posts
    };
}

export function fetchSubjectsFailure(error) {
    return {
        type: FETCH_SUBJECTS_FAILURE,
        payload: error
    };
}

