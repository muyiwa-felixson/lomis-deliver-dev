import React, { Component, PropTypes } from 'react';
import { Header, Sidebar, DashboardTitle, DeliveryCountCard, StatusChart, ProgressBar } from 'components';
import { connect } from 'react-redux';
import { fetchRounds } from 'redux/actions/roundActions';
import { getUser } from 'redux/actions/userActions';

require('./style.scss');

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchRounds();
  }

  render() {
    const deliveryCountCheck = this.props.rounds !== 'undefined' && this.props.rounds.round.id;
    const statusCheck = this.props.rounds.roundStatus !== 'undefined' && this.props.rounds.roundStatus.length > 0;
    const progressCheck = deliveryCountCheck && statusCheck;

    return (
      <div>
        <Header user={this.props.user} router={this.props.router} />
        <Sidebar />
        <div id="page-content-wrapper">
          <div className="vertical-offset-50">
            <DashboardTitle round={this.props.rounds} />
            { deliveryCountCheck ? <DeliveryCountCard roundID={this.props.rounds.round.id} /> : '' }
            { progressCheck ? <ProgressBar roundDetails={this.props.rounds.round} status={this.props.rounds.roundStatus} /> : '' }
            { statusCheck ? <StatusChart status={this.props.rounds.roundStatus} /> : '' }
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  rounds: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchRounds: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  rounds: state.rounds,
});

export default connect(mapStateToProps, { fetchRounds, getUser })(Dashboard);
