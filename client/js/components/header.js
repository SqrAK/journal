import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedPost.error && nextProps.deletedPost.error.message) {//delete failure
      alert(nextProps.deletedPost.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedPost.post && !nextProps.deletedPost.error) {//delete success
      this.context.router.push('/');
    } else if(this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      this.context.router.push('/');
    }
  }

  renderSignInLinks(authenticatedUser) {
    if(authenticatedUser) {
      return (
          <div className="user-nav">
              <div className="name">
                  <Link role="presentation" to="/profile">
                      {authenticatedUser.first_name+" " + authenticatedUser.last_name }
                  </Link>
              </div>
              <Link className="btn btn-primary sing-out" style={{color:'#ffffff',  fontSize: '17px'}}  onClick={this.props.logout}>
                  Выход
              </Link>
          </div>
      );
    }

    return (
    <div className="user-nav">
        <div className="name">Вы не вошли</div>
        <Link className="btn btn-primary sing-out" style={{color:'#ffffff',  fontSize: '17px'}} to="/signin">
            Sign in
        </Link>
    </div>
   );
  }
  
	renderLinks() {
		const { type, authenticatedUser } = this.props;
		if(type === 'signIn') {
       return (

           <div>
               <ul className="nav nav-pills">
                   <li id="marks"><Link to="/marks">
                       Оценки
                   </Link></li>
                   <li id="list"><Link to="/students">
                       Список класса
                   </Link></li>
               </ul>
               {this.renderSignInLinks(authenticatedUser)}
           </div>
  		 );
  	} else if(type === 'students') {
       return (
           <div>
               <ul className="nav nav-pills">
                   <li id="marks"><Link to="/marks">
                       Оценки
                   </Link></li>
                   <li id="list" className="active"><Link to="/students">
                       Список класса
                   </Link></li>
               </ul>
               {this.renderSignInLinks(authenticatedUser)}
           </div>
  		 );  		
  	} else if(type === 'marks') {
  			return (<div>
            <ul className="nav nav-pills">
                <li className="active" id="marks"><Link to="/marks">
                    Оценки
                </Link></li>
                <li id="list"><Link to="/students">
                    Список класса
                </Link></li>
            </ul>
                    {this.renderSignInLinks(authenticatedUser)}
            </div>
  		);
  	}
        return (

            <div>
                <ul className="nav nav-pills">
                    <li id="marks"><Link to="/marks">
                        Оценки
                    </Link></li>
                    <li id="list"><Link to="/students">
                        Список класса
                    </Link></li>
                </ul>
                {this.renderSignInLinks(authenticatedUser)}
            </div>
        );
	};

	render() {
			return (
			    <div className="head-wrap">
            <div className="header">
                {this.renderLinks()}
            </div></div>
			);
	}
}

export default Header