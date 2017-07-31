import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ProfileCardContainer from '../containers/ProfileCardContainer.js';

class Profile extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="profile"/>
        <div className="wrapper">
        	<h2>Профиль</h2>

        	<div className='well'>
        		<ProfileCardContainer />
        	</div>
        	
        </div>
      </div>
    );
  }
}


export default Profile;
