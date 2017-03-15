import React, { Component } from 'react';

export default class DashboardTitle extends Component {
  state = {};

  render() {
    return (
      <div className="dash-filter row">
        <div className="col-md-5 col-sm-12">
          <div className="dash-title">
            <h4><span>Delivery Round:</span><strong>BA-20-2016</strong></h4>
            <span>Delivery Type:</span><strong>Monthly, Bi-monthly</strong>
          </div>
        </div>

        <div className="col-md-7 col-sm-12">
          <div className="col-md-4 col-sm-6 filter-input-case">
            <div className="inner-addon right-addon">
              <i className="icon icon-marker" />
              <input type="text" className="form-control radius-secondary" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 filter-input-case">
            <div className="inner-addon right-addon inner-select radius-secondary">
              <select className="form-control radius-secondary">
                <option>-Select Round-</option>
                <option>Round 1</option>
                <option>Round 2</option>
                <option>Round 3</option>
              </select>
              <i className="glyphicon glyphicon-triangle-bottom" />
            </div>
          </div>
          <div className="col-md-4 col-sm-6 filter-input-case">
            <div className="inner-addon left-addon">
              <i className="glyphicon glyphicon-calendar" />
              <input type="date" className="form-control radius-secondary" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
