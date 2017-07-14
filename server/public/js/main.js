var subjects;
$(document).ready(function () {

    // createTableMarks();
    createSubjectSelect();

    $.get("http://localhost:3000/students", function (students) {
        console.log(students);
    });

    // $.get("http://localhost:3000/subjects", function (students) {
    //     console.log(students);
    // });

    $.post("http://localhost:3000/marks", {name: "Математика"}, function (data) {
        console.log(data);
    });


    function createInput() {

        var Form = React.createClass({

            render: function () {

                return (
                        <form role="form" className="main-form">
                            <div className="form-group">
                                <label>Логин</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Логин" />
                            </div>
                            <div className="form-group">
                                <label>Пароль</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Пароль"/>
                            </div>

                            <button type="submit" className="btn btn-primary">Войти</button>
                        </form>

                );
            }
        });

        ReactDOM.render(
            <Form />,
            document.getElementById('form-login')
        );

    }

    function createTableMarks() {
        //change query
        $.get("http://localhost:3000/marks", function (marks) {

            console.log(marks);

            // var Thead = React.createClass({
            //     render: function () {
            //
            //         return (
            //             <thead>
            //             <tr>
            //                 <th className="not-sort">Фамилия Имя Отчество</th>
            //                 <th className="not-sort">Дата получения оценки</th>
            //                 <th className="not-sort">Оценка</th>
            //             </tr>
            //             </thead>
            //
            //         );
            //     }
            // });
            //
            // var Students = React.createClass({
            //     render: function () {
            //         var data = this.props.data;
            //
            //         var studentsTemplate = data.map(function (item, index) {
            //             return (
            //                 <tr key={index}>
            //                     <td>
            //                         {item.name}
            //                     </td>
            //                     <td>
            //                         Дата
            //                     </td>
            //                     <td>
            //                         Оценка
            //                     </td>
            //                 </tr>
            //             )
            //         });
            //
            //         return (
            //             <tbody>
            //             {studentsTemplate}
            //             </tbody>
            //
            //         );
            //     }
            // });
            //
            // var Table = React.createClass({
            //     componentDidMount: function () {
            //         // $(".table").tablesorter();
            //     },
            //     render: function () {
            //
            //         return (
            //             <table className="table table-bordered">
            //                 <Thead />
            //                 <Students data={students}/>
            //             </table>
            //
            //         );
            //     }
            // });
            //
            // ReactDOM.render(
            //     <Table />,
            //     document.getElementById('table')
            // );


        });
    }

    function createStudentsTable() {
        $.get("http://localhost:3000/students", function (students) {


            var Thead = React.createClass({
                render: function () {

                    return (
                        <thead>
                        <tr>
                            <th className="not-sort">Фамилия Имя Отчество</th>
                        </tr>
                        </thead>

                    );
                }
            });


            var Students = React.createClass({
                render: function () {
                    var data = this.props.data;

                    var studentsTemplate = data.map(function (item, index) {
                        return (
                            <tr key={index}>
                                <td>
                                    {item.name}
                                </td>
                            </tr>
                        )
                    });

                    return (
                        <tbody>
                        {studentsTemplate}
                        </tbody>

                    );
                }
            });

            var Table = React.createClass({
                componentDidMount: function () {
                    // $(".table").tablesorter();
                },
                render: function () {

                    return (
                        <table className="table table-bordered">
                            <Thead />
                            <Students data={students}/>
                        </table>

                    );
                }
            });

            ReactDOM.render(
                <Table />,
                document.getElementById('table')
            );

        });
    }

    function createSubjectSelect() {
        $.get("http://localhost:3000/subjects", function (subjects) {
            console.log(subjects);
            var SelectSubject = React.createClass({

                onChangeHandler: function (e) {
                    //Change subject
                    alert("Change subject");
                },
                render: function () {
                    var data = this.props.data;

                    var subjectsTemplate = data.map(function (item, index) {
                        return (
                            <option key={index}>
                                {item.name}
                            </option>
                        )
                    });

                    return (
                        <select className="subject" onChange={this.onChangeHandler}>
                            {subjectsTemplate}
                        </select>

                    );
                }
            });

            ReactDOM.render(
                <SelectSubject data={subjects}/>,
                document.getElementById('subjects')
            );

        });
    }


    $('#list').click(function () {
        // $(this).addClass("active");
        // $('#marks').removeClass("active");
        // $("#filters").hide();
        // createStudentsTable();

    });

    $('#marks').click(function () {
        // $(this).addClass("active");
        // $('#list').removeClass("active");
        // $("#filters").show();
        // createTableMarks();
    });

});

