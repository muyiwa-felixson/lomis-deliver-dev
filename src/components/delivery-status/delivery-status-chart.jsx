import React, { Component, PropTypes } from 'react';
import { DeliveryChart } from 'components';

require('./chart.scss');

class StatusChart extends Component {
  state = {};

  chart2 = [
    { percent: 1, color: '#2f97c9', emphasis: true },
    { percent: 0, color: '#77d0fb', emphasis: false },
    { percent: 2, color: '#caeeff', emphasis: false },
    { percent: 90, color: '#95c98a', emphasis: false },
    { percent: 2, color: '#e5825d', emphasis: false },
    { percent: 1, color: '#d35525', emphasis: false },
    { percent: 3, color: '#a23d17', emphasis: true },
  ];

  convertStatus = (status) => {
    const percent = {};
    percent.actualDeliveries = (status.completedDeliveries / status.totalDeliveries) * 100;
    percent.unreportedDeliveries = (status.unreportedDeliveries / status.totalDeliveries) * 100;
    percent.cancelledDeliveries = (status.cancelledDeliveries / status.totalDeliveries) * 100;

    return percent;
  };

  render() {
    const status = this.props.status[0].value;
    const firstChart = [{
      percent: (status.completedDeliveries / status.totalDeliveries) * 100,
      color: '#77d0fb',
      emphasis: true,
    },
    {
      percent: (status.cancelledDeliveries / status.totalDeliveries) * 100,
      color: '#d35525',
      emphasis: false,
    },
    {
      percent: (status.unreportedDeliveries / status.totalDeliveries) * 100,
      color: '#aaa',
      emphasis: false,
    }];

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
                  <i className="icon icon-circle cblue-fade" />
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
                <DeliveryChart chartData={firstChart} />
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
                  Early Deliveries
                </span>
              </div>

              <div className="col-md-6 col-xs-12">
                <span className="legend-data">
                  <i className="icon icon-circle cred-fade" />
                  Late Deliveries
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

StatusChart.propTypes = {
  status: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default StatusChart;
