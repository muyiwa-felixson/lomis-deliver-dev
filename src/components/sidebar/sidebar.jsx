import React, { Component } from 'react';

export default class Sidebar extends Component {
  state = {};

  render() {
    return (
      <div id="sidebar-wrapper">
        <div className="menu-button" >
          <a className="btn btn-link radius-secondary bk_trans margin-menu-button" id="menu-toggle" data-toggle="tooltip" data-container="body" data-placement="right" title="Expand Menu">
            <i className="fa fa-bars" />
          </a>
        </div>
        <ul className="sidebar-nav">
          <li>
            <a>
              <i className="glyphicon glyphicon-home" data-toggle="tooltip" data-container="body" data-placement="right" title="Home" />
              Home
            </a>
          </li>
          <li>
            <a>
              <i className="glyphicon glyphicon-stats" data-toggle="tooltip" data-container="body" data-placement="right" title="Report" />
              Reports
            </a>
          </li>
          <li>
            <a>
              <i className="icon icon-sync" data-toggle="tooltip" data-container="body" data-placement="right" title="Imports" />
              Imports
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
