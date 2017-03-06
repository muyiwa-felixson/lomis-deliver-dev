import React, { Component } from 'react';

require('./chart.scss');

export default class StatusChart extends Component {
  state = {};

  render() {
    return (
      <div className="stat-section row">
        <div className="col-md-6 col-xs-12">
          <div className="stat-box radius-primary">
            <a href="report.html" className="stat-box-head">Delivery Status
              <i className="icon icon-exit-to-app" />
            </a>
            <div className="row stat-legend">
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle clightblue" />
                  Total Actual Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle corange" />
                  Cancelled  Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle cgrey" />
                  Uncompleted Deliveries
                </span>
              </div>
            </div>
            <div className="row chart-box">
              <div className="minichart delivery-chart-box">
                <svg version="1.1" id="minisvg2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="420px" height="420px" viewBox="0 0 450 450">
                  <circle className="backdropblue" cx="225" cy="225" r="200" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xs-12">
          <div className="stat-box radius-primary">
            <a href="" className="stat-box-head">
              Delivery Lags
              <i className="icon icon-exit-to-app" />
            </a>
            <div className="row stat-legend more-point">
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle cblue" />
                  Too Early Delivery
                  </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle cred" />
                  Too Late Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle cblue-fade" />
                  <i className="fa fa-circle cblue-fader" />
                  Early Deliveries [+4,+2]
                </span>
              </div>

              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle cred-fade" />
                  <i className="fa fa-circle cred-fader" />
                  Late Deliveries [-4,-2]
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle cgreen" />
                  Ontime Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="fa fa-circle cgrey" />
                  Upcoming Deliveries
                </span>
              </div>
            </div>
            <div className="row chart-box">
              <div className="minichart delivery-chart-box">
                <svg version="1.1" id="minisvg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="420px" height="420px" viewBox="0 0 450 450">
                  <circle className="backdrop" cx="225" cy="225" r="200" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
