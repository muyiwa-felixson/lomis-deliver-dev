import React, { Component, PropTypes } from 'react';
import { Header, Sidebar, DashboardTitle, DeliveryCountCard, StatusChart } from 'components';
import { connect } from 'react-redux';

require('./style.scss');

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <Sidebar />
        <div id="page-content-wrapper">
          <div className="vertical-offset-50">
            <DashboardTitle />
            <DeliveryCountCard />
            <StatusChart />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired, //eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps)(Dashboard);
