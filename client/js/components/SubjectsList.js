/**
 * Created by alice on 29.07.17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios'


class SubjectsList extends Component {


    componentWillMount() {
        let user =this.props.user.user;
        if(!user) return;
        this.props.fetchSubjects();

    }

    onChangeSelect(e) {
        let user =this.props.user.user;

        if (user.Role.name === "Ученик"){
            this.props.changeSubject(e.target.value, user.id);
        }
        else
            this.props.changeSubject(e.target.value, this.props.studentId);

    }


    renderSubjects(subjects) {
        return subjects.map((subject, index) => {
            return (
                <option key={index}>
                    {subject.name}
                </option>
            );
        });
    }

    renderPermissions(subjects) {
        if(!this.props.user.user) {
            return;
        }

        return (
            <div className="subject">

                <span>Вы смотрите оценки по предмету:</span>
                <select onChange={this.onChangeSelect.bind(this)}>
                    {
                        this.renderSubjects(subjects.subject)
                    }
                </select>

            </div>
        );
    }

    render() {
        const { subjects, loading, error } = this.props.subjectsList;


        if(loading) {
            return <div className="container"><h1>Предметы</h1><h3>Loading...</h3></div>
        } else if(error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        return (<div>
            {this.renderPermissions(subjects)}
        </div>
        );
    }
}


export default SubjectsList;