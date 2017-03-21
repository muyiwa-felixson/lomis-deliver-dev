import React, { Component, PropTypes } from 'react';
import { DateRange } from 'components';

class DashboardTitle extends Component {
  state = {};

  render() {
    return (
      <div className="dash-filter row">
        <div className="col-md-5 col-sm-12">
          <div className="dash-title">
            <h4>
              <span>Delivery Round:</span>
              <strong>{this.props.round.round.id}</strong>
            </h4>
            <span>Delivery Type:</span><strong>Monthly</strong>
          </div>
        </div>

        <div className="col-md-7 col-sm-12">
          <div className="row">
            <div className="col-md-4 col-sm-6 filter-input-case">
              <div className="inner-addon right-addon">
                <i className="icon icon-marker" />
                <input type="text" className="form-control radius-secondary" />
              </div>
            </div>
            <div className="col-md-4 col-sm-6 filter-input-case">
              <div className="inner-addon overflow right-addon inner-select radius-secondary">
                <select className="form-control radius-secondary">
                  <option>-Select Round-</option>
                  <option>Round 1</option>
                  <option>Round 2</option>
                  <option>Round 3</option>
                </select>
                <i className="icon icon-caret-down" />
              </div>
            </div>
            <DateRange />
          </div>
        </div>
      </div>
    );
  }
}

DashboardTitle.propTypes = {
  round: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DashboardTitle;
