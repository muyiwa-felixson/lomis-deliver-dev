import React, { Component, PropTypes } from 'react';
import { DateRange } from 'components';
import Select from 'react-select';
import Api from 'helpers/api';
import config from 'config';
import { connect } from 'react-redux';
import { fetchSingleRound, fetchRoundCount } from 'redux/actions/roundActions';

import 'react-select/scss/default.scss';

class DashboardTitle extends Component {
  state = {
    locationValue: '',
    roundValue: '',
    roundResult: [],
  };

  getRound = (val) => {
    this.setState({
      roundValue: val.value,
    });
    this.props.singleRound(val.value);
    this.props.roundCount(val.value);
  }

  updateLocation = (val) => {
    const apiClient = new Api();
    apiClient.get(`${config.ROUND_LOCATION_URL}${val}`)
      .then((res) => {
        const result = res.map((round) => {
          const roundObj = {};
          roundObj.value = round.id;
          roundObj.label = round.id;

          return roundObj;
        });
        this.setState({ roundResult: result });
      });
    this.setState({
      locationValue: val,
    });
  }

  render() {
    const opt = this.props.locations !== undefined ?
    this.props.locations.locations.map((location) => {
      const obj = {};
      obj.value = location.key;
      obj.label = location.key;

      return obj;
    }) : '';

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
                <Select name="selected-location" placeholder="Select Location..." options={opt} simpleValue value={this.state.locationValue} onChange={this.updateLocation} />
              </div>
            </div>
            <DateRange />
            <div className="col-md-4 col-sm-6 filter-input-case">
              <div className="inner-addon right-addon">
                <Select name="selected-round" placeholder="Select Delivery Round..." options={this.state.roundResult} value={this.state.roundValue} onChange={this.getRound} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardTitle.propTypes = {
  round: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  locations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  singleRound: PropTypes.func.isRequired,
  roundCount: PropTypes.func.isRequired,
};
const mapStatetoProps = ({ rounds, locations }) => ({ round: rounds, locations });

export default connect(mapStatetoProps,
  {
    singleRound: fetchSingleRound,
    roundCount: fetchRoundCount,
  })(DashboardTitle);
