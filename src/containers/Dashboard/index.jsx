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
    return (
      <div>
        <Header user={this.props.user} />
        <Sidebar />
        <div id="page-content-wrapper">
          <div className="vertical-offset-50">
            <DashboardTitle round={this.props.rounds} />
            { this.props.rounds !== 'undefined' && this.props.rounds.round.id ? <DeliveryCountCard roundID={this.props.rounds.round.id} /> : '' }
            <ProgressBar position="80" complete="40" />
            <StatusChart />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  rounds: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  fetchRounds: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  rounds: state.rounds,
});

export default connect(mapStateToProps, { fetchRounds, getUser })(Dashboard);
