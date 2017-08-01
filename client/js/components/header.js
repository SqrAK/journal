import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

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