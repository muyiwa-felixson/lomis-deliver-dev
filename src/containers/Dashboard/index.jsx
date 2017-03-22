import React, { Component, PropTypes } from 'react';
import { Header, Sidebar, DashboardTitle, DeliveryCountCard, StatusChart, ProgressBar } from 'components';
import { connect } from 'react-redux';
import { fetchRounds, fetchRoundCount } from 'redux/actions/roundActions';
import { getUser } from 'redux/actions/userActions';

require('./style.scss');

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchRounds();
  }

  // renderDeliveryCount() {
  //   if (this.props.rounds) {
  //     this.props.fetchRoundCount(this.props.rounds.round.id);
  //     return <DeliveryCountCard />;
  //   }
  // }

  render() {
    const deliveryCount = typeof this.props.rounds !== 'undefined';
    const deliveryCountValue = (deliveryCount) ? <DeliveryCountCard roundID={this.props.rounds.round.id} /> : '';
    console.log(this.props, 'in render');
    return (
      <div>
        <Header user={this.props.user} />
        <Sidebar />
        <div id="page-content-wrapper">
          <div className="vertical-offset-50">
            <DashboardTitle round={this.props.rounds} />
            { deliveryCountValue }
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
  fetchRounds: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
  // fetchRoundCount: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  user: state.user,
  rounds: state.rounds,
});

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(roundActions, dispatch),
// });

export default connect(mapStateToProps, { fetchRounds, getUser, fetchRoundCount })(Dashboard);
