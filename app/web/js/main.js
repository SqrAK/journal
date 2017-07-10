var subjects;
$(document).ready(function () {

    createTableMarks();
    createSubjectSelect();

    function createTableMarks() {
        //change query
        $.get("http://localhost:3000/students", function (students) {

            console.log(students);

            var Thead = React.createClass({
                render: function () {

                    return (
                        <thead>
                        <tr>
                            <th className="not-sort">Фамилия Имя Отчество</th>
                            <th className="not-sort">Дата получения оценки</th>
                            <th className="not-sort">Оценка</th>
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
                                <td>
                                    Дата
                                </td>
                                <td>
                                    Оценка
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

            $(".table").tablesorter();

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

            $(".table").tablesorter();

        });

    }

    function createSubjectSelect() {
        $.get("http://localhost:3000/subjects", function (subjects) {
            // console.log(subjects);
            //subjects = subjects;
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
                                {item.subjName}
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


    // $.post("http://localhost:3000/loadmarks",{subjectId : 1}, function(data){
    //     console.log(data);
    // });


    $('#list').click(function () {
        $(this).addClass("active");
        $('#marks').removeClass("active");
        $("#filters").hide();
        createStudentsTable();

    });

    $('#marks').click(function () {
        $(this).addClass("active");
        $('#list').removeClass("active");
        $("#filters").show();
        createTableMarks();
    });

});

