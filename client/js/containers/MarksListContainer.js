/**
 * Created by alice on 28.07.17.
 */
import { connect } from 'react-redux'
import { fetchMarks, fetchMarksSuccess, fetchMarksFailure } from '../actions/marks';
import MarksList from '../components/MarksList';


const mapStateToProps = (state, ownProps) => {
    return {
        marksList: state.marks.marksList,
        user: state.user,
        studentId: ownProps.id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchMarks: (subjectName, id) => {
            dispatch(fetchMarks(subjectName, id)).then((response) => {
                !response.error ? dispatch(fetchMarksSuccess(response.payload.data)) : dispatch(fetchMarksFailure(response.payload.data));
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarksList);