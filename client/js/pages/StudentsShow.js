/**
 * Created by alice on 30.07.17.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { deletePost } from '../actions/posts';
import Header from '../containers/HeaderContainer.js';
import SubjectsContainer from '../containers/SubjectsContainer'
import MarksListContainer from '../containers/MarksListContainer';

class StudentsShow extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onDeleteClick() {
        // this.props.deletePost(this.props.params.id)
        //     .then(() => { this.context.router.push('/'); });
    }

    render() {
        return (
            <div>
                <Header type="students_show" postId={this.props.params.id}/>
                <div className="wrapper">
                    <SubjectsContainer id={this.props.params.id} />
                    <MarksListContainer id={this.props.params.id} />
                </div>
            </div>
        );
    }
}

export default StudentsShow;
