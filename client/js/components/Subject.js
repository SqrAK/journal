/**
 * Created by alice on 22.07.17.
 */
import React, { PropTypes, Component } from 'react'
import axios from 'axios';

export default class Subject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subject: []
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/v1/subject`)
            .then(res => {
                //const posts = res.data.mark;
                const subject = res.data.subject;

                this.setState({ subject });
            });
    }

    onChangeSelect(e) {
        alert("Subject changed");
    }

    render() {
        // const  subjects  = this.props.subject

        return<div id="subjects">
        <h5>Вы смотрите оценки по предмету:</h5>
        <select className="subject" onChange={this.onChangeSelect.bind(this)}>
            {
                    this.state.subject.map((entry, index) =>
                    <option key={index}>
                        {entry.name}
                    </option>
                    )
            }

        </select>
        </div>
    }
}

// Subject.propTypes = {
//     subject: PropTypes.array.isRequired
// }
