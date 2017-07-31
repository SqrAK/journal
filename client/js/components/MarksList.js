/**
 * Created by alice on 28.07.17.
 */
import React, { Component, PropTypes } from 'react';
import ReactTable from 'react-table'
import { Link } from 'react-router';

class MarksList extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        let user =this.props.user.user;
        if(!user) return;
        if (user.Role.name === "Ученик"){
            this.props.fetchMarks("Информатика", user.id);
        }
        else
            this.props.fetchMarks("Информатика", this.props.studentId);
    }


    render() {

        const columns = [{
            Header: 'Фамилия Имя Отчество',
            accessor: 'User.name' // String-based value accessors!
        }, {
            Header: 'Дата',
            accessor: 'date'
        }, {
            id: 'Оценка',
            Header: 'Оценка',
            accessor: "value"
        }]


        const { marks, loading, error } = this.props.marksList;

        if(loading) {
            return <div className="container"><h1>Marks</h1><h3>Loading...</h3></div>
        } else if(error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        let user =this.props.user.user;
        if(!user) {
            return (
                <div className="">
                    <h3>Авторизуйтесь для просмотра списка оценок</h3>
                </div>
            );
        }


        marks.mark.map((mark) => {
            mark.User.name = mark.User.first_name + " "+ mark.User.last_name;
        });

        if(marks.mark.length === 0){
            return <div >
                <h3>Нет оценок по выбранному предмету</h3>
            </div>
        }

        return ( <ReactTable
                filterable
                data={marks.mark}
                columns={columns}
                defaultPageSize={10}
            />
        );
    }
}


export default MarksList;
