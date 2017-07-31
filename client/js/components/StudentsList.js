/**
 * Created by alice on 28.07.17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactTable from 'react-table'

class StudentsList extends Component {

    componentWillMount() {
        let user =this.props.user.user;
        if(!user) return;
         this.props.fetchStudents();
    }

    renderPermissions(data) {
        let user =this.props.user.user;
        let columns = [
            {
                Header: 'Фамилия Имя Отчество',
                accessor: 'name'
            }];

        if(user.Role.name === "Учитель"){
            columns = [
                {
                    Header: 'Фамилия Имя Отчество',
                    accessor: 'name',
                    Cell: row => (
                        <Link style={{color:'#000000'}} to={"students/" + row.original.id}>{row.value} </Link>
                    )
                }];
        }


        return (
            <ReactTable
                filterable
                data={data}
                columns={columns}
                defaultPageSize={10}
            />
        );
    }

    render() {



        const { students, loading, error } = this.props.studentsList;

        if(loading) {
            return <div><h1>Students</h1><h3>Loading...</h3></div>
        } else if(error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        let user =this.props.user.user;
        if(!user) {
            return (
                <div className="">
                    <h3>Авторизуйтесь для просмотра списка учеников</h3>
                </div>
            );
        }

        students.user.map((student, index) => {
            student.name = student.first_name + " "+ student.last_name;
        });

        return (<div>
                {this.renderPermissions(students.user)}
            </div>
        );
    }
}


export default StudentsList;
