/**
 * Created by alice on 28.07.17.
 */
import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import StudentsListContainer from '../containers/StudentsListContainer';

class StudentsList extends Component {
    render() {
        return (
            <div>
                <HeaderContainer type="students"/>
                <div className="wrapper">
                    <StudentsListContainer />
                </div>

            </div>
        );
    }
}


export default StudentsList;
