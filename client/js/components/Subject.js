/**
 * Created by alice on 22.07.17.
 */
import React, { PropTypes, Component } from 'react'

export default class Subject extends Component {
    onChangeSelect(e) {
        alert("Subject changed");
    }

    render() {
        const  subjects  = this.props.name

        return<div id="subjects">
        <h5>Вы смотрите оценки по предмету:</h5>
        <select className="subject" onChange={this.onChangeSelect.bind(this)}>
            {
                    subjects.map((entry, index) =>
                    <option key={index}>
                        {entry.name}
                    </option>
                    )
            }

        </select>
        </div>
    }
}

Subject.propTypes = {
    name: PropTypes.array.isRequired
}
