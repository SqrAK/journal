import React, { PropTypes, Component } from 'react'

export default class Mark extends Component {
    render() {
        const  marks  = this.props.marks

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
                marks.map((item, index) =>
                    <tr key={index}>
                        <td>
                            {item.first_name + ' ' +item.last_name}
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
