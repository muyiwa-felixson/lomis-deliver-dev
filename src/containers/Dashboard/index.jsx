import React, { Component, PropTypes } from 'react';
import { Header, Sidebar, DashboardTitle, DeliveryCountCard, StatusChart, ProgressBar, MyLoader } from 'components';
import { connect } from 'react-redux';
import { fetchRounds, fetchSingleRound, fetchRoundCount } from 'redux/actions/roundActions';
import fetchLocations from 'redux/actions/locationActions';

require('./style.scss');

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchRounds();
    this.props.fetchLocations();
  }

  render() {
    const deliveryCountCheck = this.props.roundsObject !== 'undefined' && this.props.roundsObject.round.id;
    const statusCheck = this.props.roundsObject.roundStatus !== 'undefined' && this.props.roundsObject.roundStatus.length > 0;
    const progressCheck = deliveryCountCheck && statusCheck;
    const locationsCheck = this.props.locationsObject !== 'undefined' && this.props.locationsObject.locations.length > 0;

    return (
      <div>
        <Header userObject={this.props.userObject} router={this.props.router} />
        <div id="wrapper" className={this.props.roundsObject.toggleState}>
          <Sidebar />
          <MyLoader message="LOADING!" display />
          <div id="page-content-wrapper">
            <div className="vertical-offset-50">
              { locationsCheck ? <DashboardTitle round={this.props.roundsObject} locations={this.props.locationsObject} /> : '' }
              { deliveryCountCheck ? <DeliveryCountCard roundID={this.props.roundsObject.round.id} /> : '' }
              { progressCheck ? <ProgressBar roundDetails={this.props.roundsObject.round} status={this.props.roundsObject.roundStatus} /> : '' }
              { statusCheck ? <StatusChart status={this.props.roundsObject.roundStatus} /> : '' }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  userObject: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  roundsObject: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  locationsObject: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchRounds: PropTypes.func.isRequired,
  fetchLocations: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userObject: state.user,
  roundsObject: state.rounds,
  locationsObject: state.locations,
});

export default connect(mapStateToProps,
  {
    fetchRounds,
    fetchSingleRound,
    fetchLocations,
    fetchRoundCount,
  })(Dashboard);
