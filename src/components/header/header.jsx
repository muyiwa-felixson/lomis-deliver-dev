import React, { Component, PropTypes } from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

const logo = require('./assets/logo.png');

class Header extends Component {
  state = {
    user: {
      name: '',
      role: '',
    },
  };

  handleSignOut = () => {
    cookie.remove('accessToken', { path: '/' });
    browserHistory.push('/login');
  }

  render() {
    return (
      <div className="header-bar">
        <div className="container-fluid">
          <header className="row">
            <div className="col-fixed-250 logo">
              <a href="index.html" id="app-brand" className="app-brand">
                <img src={logo} role="presentation" />
              </a>
            </div>
            <div className="col-md-12 col-offset-250 text-right dropdown-container">
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle radius-secondary bk_trans" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  <i className="icon icon-user pad-right" /> {this.props.user.name}
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                  <li><span><i className="icon icon-settings pad-right" />Manage Profile</span></li>
                  <li><a href="" onClick={this.handleSignOut}><span><i className="icon icon-exit-to-app pad-right" />Sign Out</span></a></li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired, //eslint-disable-line react/forbid-prop-types
};

export default Header;
