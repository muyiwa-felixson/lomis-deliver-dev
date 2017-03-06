import React, { Component } from 'react';

require('./header.scss');

export default class Header extends Component {
  state = {};

  render() {
    return (
      <div className="header-bar">
        <div className="container-fluid">
          <header className="row">
            <div className="col-fixed-250 logo">
              <a href="index.html" id="app-brand" className="app-brand">
                <img src="./assets/logo.png" role="presentation" />
              </a>
            </div>
            <div className="col-md-12 col-offset-250 text-right dropdown-container">
              <div className="dropdown">
                <button className="btn btn-link dropdown-toggle radius-secondary bk_trans" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  <i className="icon icon-user pad-right" /> Super User
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                  <li><a><i className="icon icon-settings pad-right" />Manage Profile</a></li>
                  <li><a><i className="icon icon-exit-to-app pad-right" />Sign Out</a></li>
                </ul>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}
