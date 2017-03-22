import React, { Component } from 'react';
import { DeliveryChart } from 'components';

require('./chart.scss');

export default class StatusChart extends Component {
  state = {};
  chart1 = [{
    percent: 30,
    color: '#77d0fb',
    emphasis: true,
  },
  {
    percent: 60,
    color: '#d35525',
    emphasis: false,
  }];

  chart2 = [
    { percent: 1, color: '#2f97c9', emphasis: true },
    { percent: 0, color: '#77d0fb', emphasis: false },
    { percent: 2, color: '#caeeff', emphasis: false },
    { percent: 90, color: '#95c98a', emphasis: false },
    { percent: 2, color: '#e5825d', emphasis: false },
    { percent: 1, color: '#d35525', emphasis: false },
    { percent: 3, color: '#a23d17', emphasis: true },
  ];
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
                  <i className="icon icon-circle clightblue" />
                  Total Actual Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle corange" />
                  Cancelled  Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle cgrey" />
                  Uncompleted Deliveries
                </span>
              </div>
            </div>
            <div className="row chart-box">
              <div className="minichart delivery-chart-box">
                <DeliveryChart chartData={this.chart1} />
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
                  <i className="icon icon-circle cblue" />
                  Too Early Delivery
                  </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle cred" />
                  Too Late Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle cblue-fade" />
                  <i className="icon icon-circle cblue-fader" />
                  Early Deliveries [+4,+2]
                </span>
              </div>

              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle cred-fade" />
                  <i className="icon icon-circle cred-fader" />
                  Late Deliveries [-4,-2]
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle cgreen" />
                  Ontime Deliveries
                </span>
              </div>
              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle cgrey" />
                  Upcoming Deliveries
                </span>
              </div>
            </div>
            <div className="row chart-box">
              <div className="minichart delivery-chart-box">
                <DeliveryChart chartData={this.chart2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
