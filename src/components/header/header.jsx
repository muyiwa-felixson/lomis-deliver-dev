import React, { Component, PropTypes } from 'react';
import cookie from 'react-cookie';

const logo = require('./assets/logo.png');

class Header extends Component {
  state = {};

  handleSignOut = () => {
    cookie.remove('accessToken', { path: '/' });
    this.props.router.push('/#/login');
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
                  <i className="icon icon-user pad-right" /> {this.props.userObject.user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                  <li><a><i className="icon icon-settings pad-right" />Manage Profile</a></li>
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
  router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userObject: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Header;
