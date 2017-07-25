import React, { PropTypes, Component } from 'react'
import axios from 'axios';

export default class Mark extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mark: []
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/v1/mark/Математика`)
            .then(res => {
                //const posts = res.data.mark;
                 const mark = res.data.mark;

                this.setState({ mark });
            });
    }



    render() {

        return <table className="table table-bordered">
            <thead>
            <tr>
                <th className="not-sort">Фамилия Имя Отчество</th>
                <th className="not-sort">Дата получения оценки</th>
                <th className="not-sort">Оценка</th>
            </tr>
            </thead>

            <tbody>

                {
                    this.state.mark.map((item, index) =>
                        <tr key={index}>
                            <td>
                                {item.User.first_name + ' ' +item.User.last_name}
                            </td>
                            <td>
                                {item.date}
                            </td>
                            <td>
                                {item.value}
                            </td>
                        </tr>
                    )
                }
            </tbody>

        </table>
    }
}

Mark.propTypes = {
    marks: PropTypes.array.isRequired
}
