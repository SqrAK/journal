/**
 * Created by alice on 29.07.17.
 */
import { connect } from 'react-redux'
import { fetchSubjects, fetchSubjectsSuccess, fetchSubjectsFailure } from '../actions/subjects';
import SubjectsList from '../components/SubjectsList';

import { fetchMarks, fetchMarksSuccess, fetchMarksFailure } from '../actions/marks';


const mapStateToProps = (state, ownProps) => {
    return {
        subjectsList: state.subjects.subjectsList,
        user: state.user,
        studentId: ownProps.id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSubjects: () => {
            dispatch(fetchSubjects()).then((response) => {
                !response.error ? dispatch(fetchSubjectsSuccess(response.payload.data)) : dispatch(fetchSubjectsFailure(response.payload.data));
            });
        },
        changeSubject:(subjectName, userid) => {
            dispatch(fetchMarks(subjectName, userid)).then((response) => {
                !response.error ? dispatch(fetchMarksSuccess(response.payload.data)) : dispatch(fetchMarksFailure(response.payload.data));
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectsList);