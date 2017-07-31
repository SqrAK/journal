/**
 * Created by alice on 28.07.17.
 */
import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import MarksListContainer from '../containers/MarksListContainer';
import SubjectsContainer from '../containers/SubjectsContainer';

class MarksList extends Component {
    render() {
        return (
            <div>
                <HeaderContainer type="marks"/>
                <div className="wrapper">
                    <SubjectsContainer />
                    <MarksListContainer />
                </div>

            </div>
        );
    }
}


export default MarksList;
