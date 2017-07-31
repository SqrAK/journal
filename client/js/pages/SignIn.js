import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';

class SignIn extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="signIn"/>
          <div className="wrapper">
              <SignInFormContainer />
          </div>
      </div>
    );
  }
}


export default SignIn;
