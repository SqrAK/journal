import React, { PropTypes, Component } from 'react'

export default class User extends Component {
  render() {
    const { name } = this.props
    return <div className="head-wrap">
      <header>
        <div className="name">{name}</div>
        <ul className="nav nav-pills">
          <li className="active" id="marks"><a href="#">Оценки</a></li>
          <li id="list"><a href="#" >Список класса</a></li>
        </ul>

        <button className="btn btn-primary sing-out">Выход</button>
      </header>
    </div>
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired
}
