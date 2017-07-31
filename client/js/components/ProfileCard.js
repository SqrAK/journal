import React from 'react';
import { Component } from 'react';

export default class ProfileCard extends Component {

  render() {
    let user = this.props.user.user;
    return (
      <div>
        <div><span>Имя: </span> {user && user.first_name}</div>
        <div><span>Фамилия: </span> {user && user.last_name}</div>
        <div><span>Роль: </span> {user && user.Role.name}</div>
      </div>
    );
  }
}
