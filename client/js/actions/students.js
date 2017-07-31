/**
 * Created by alice on 28.07.17.
 */
import axios from 'axios';

//Post list
export const FETCH_STUDENTS = 'FETCH_STUDENTS';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';
export const FETCH_STUDENTS_FAILURE = 'FETCH_STUDENTS_FAILURE';




export function fetchStudents() {
    const request = axios({
        method: 'get',
        url: `http://localhost:3000/api/v1/user/student`,
        headers: []
    });

    return {
        type: FETCH_STUDENTS,
        payload: request
    };
}

export function fetchStudentsSuccess(posts) {
    return {
        type: FETCH_STUDENTS_SUCCESS,
        payload: posts
    };
}

export function fetchStudentsFailure(error) {
    return {
        type: FETCH_STUDENTS_FAILURE,
        payload: error
    };
}


