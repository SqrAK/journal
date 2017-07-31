/**
 * Created by alice on 28.07.17.
 */
import { connect } from 'react-redux'
import { fetchStudents, fetchStudentsSuccess, fetchStudentsFailure } from '../actions/students';
import StudentsList from '../components/StudentsList';


const mapStateToProps = (state) => {
    return {
        studentsList: state.students.studentsList,
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => {
            dispatch(fetchStudents()).then((response) => {
                !response.error ? dispatch(fetchStudentsSuccess(response.payload.data)) : dispatch(fetchStudentsFailure(response.payload.data));
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);