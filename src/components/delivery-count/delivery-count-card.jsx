import React, { Component } from 'react';

export default class DeliveryCountCard extends Component {
  state = {};

  render() {
    return (
      <div className="row dash-contain">
        <div className="col-md-3 col-sm-6">
          <div className="dash-summary radius-primary">
            <div className="col-xs-4 lightblue micon"><i className="icon icon-truck-li" /></div>
            <div className="col-xs-8 mdet">
              <h3>20</h3>
              <span className="clightblue">Expected </span>
              Delivery
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="dash-summary radius-primary">
            <div className="col-xs-4 blue micon"><i className="icon icon-like-li" /></div>
            <div className="col-xs-8 mdet">
              <h3>19</h3>
              <span className="cblue">Actual </span>
              Delivery
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="dash-summary radius-primary">
            <div className="col-xs-4 red micon"><i className="icon icon-info" /></div>
            <div className="col-xs-8 mdet">
              <h3>1</h3>
              <span className="cred">Failed</span>
              Delivery
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6">
          <div className="dash-summary radius-primary">
            <div className="col-xs-4 green micon"><i className="icon icon-receipt" /></div>
            <div className="col-xs-8 mdet">
              <h3>21</h3>
              <span className="cgreen">Billable </span>
              Delivery
            </div>
          </div>
        </div>
      </div>
    );
  }
}
