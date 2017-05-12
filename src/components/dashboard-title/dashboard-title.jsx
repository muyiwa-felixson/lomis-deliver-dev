import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import config from 'config';
import { connect } from 'react-redux';
import { fetchSingleRound, fetchRoundCount, getRoundsByLocation } from 'redux/actions/roundActions';

import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap-daterangepicker/daterangepicker.scss';
import 'react-select/scss/default.scss';
import './date-range.scss';

class DashboardTitle extends Component {
  state = {
    startDate: '',
    endDate: '',
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

  getRoundListByLocation = (val) => {
    this.props.getRoundsByLocation(config.ROUND_LOCATION_URL, val)
      .then((res) => {
        const result = res.map((round) => {
          const roundObj = {};
          roundObj.value = round.id;
          roundObj.label = round.id;

          return roundObj;
        });
        this.setState({ roundResult: result });
      });
  }

  handleApply = (event, picker) => {
    const location = this.state.locationValue !== '' ? this.state.locationValue : 'Kano';
    let startDate = new Date(picker.startDate.format('YYYY-MM-DD'));
    let endDate = new Date(picker.endDate.format('YYYY-MM-DD'));
    startDate = startDate.toISOString();
    endDate = endDate.toISOString();
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
    this.props.getRoundsByLocation(config.LOCATION_AND_DATE_URL, location)
      .then((resp) => {
        const result = resp.filter((round) => { // eslint-disable-line
          if (startDate <= round.value[0] && endDate >= round.value[0]) {
            return round;
          }
        });
        const filteredList = result.map((val) => {
          const roundObj = {};
          roundObj.value = val.id;
          roundObj.label = val.id;

          return roundObj;
        });
        this.setState({ roundResult: filteredList });
      });
  }

  handleChange = (e) => {
    console.log(e, 'handle change');
  }

  roundOptions = (this.state.locationValue === '' && this.props.round && this.props.round.round.doc) ?
    this.getRoundListByLocation(this.props.round.round.doc.state) : this.state.roundResult;

  updateLocation = (val) => {
    this.getRoundListByLocation(val);
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

    const labelValue = () => {
      if (this.state.startDate === '') {
        return 'Select Date Range';
      }

      const start = this.state.startDate.format('YYYY-MM-DD');
      const end = this.state.endDate.format('YYYY-MM-DD');
      let label = `${start} - ${end}`;
      if (start === end) {
        label = start;
      }
      return label;
    };

    const getRoundNumber = () => {
      const id = this.props.round && this.props.round.round && this.props.round.round.id ? this.props.round.round.id.split('-')[1] : '';
      return id;
    };

    const getRoundLocation = () => {
      const location = this.props.round.round && this.props.round.round.doc ? this.props.round.round.doc.state : '';
      return location;
    };

    return (
      <div className="dash-filter row">
        <div className="col-md-5 col-sm-12">
          <div className="dash-title">
            <h4>
              <span>Round Number:</span>
              <strong>{getRoundNumber()}</strong>
            </h4>
            <h4>
              <span>Location:</span>
              <strong>{getRoundLocation()}</strong>
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
            <div className="col-md-4 col-sm-6 filter-input-case">
              <DatetimeRangePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onApply={this.handleApply}
              >
                <div className="inner-addon right-addon">
                  <i className="icon icon-calendar" />
                  <input placeholder="Select Date Range" type="text" className="form-control radius-secondary" value={labelValue()} onChange={this.handleChange} />
                </div>
              </DatetimeRangePicker>
            </div>
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
  getRoundsByLocation: PropTypes.func.isRequired,
  singleRound: PropTypes.func.isRequired,
  roundCount: PropTypes.func.isRequired,
};
const mapStatetoProps = ({ rounds, locations }) => ({ round: rounds, locations });

export default connect(mapStatetoProps,
  {
    singleRound: fetchSingleRound,
    roundCount: fetchRoundCount,
    getRoundsByLocation,
  })(DashboardTitle);
