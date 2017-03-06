import React, { Component } from 'react';
import { Header, Sidebar, DashboardTitle, DeliveryCountCard, StatusChart, RoundProgress } from 'components';

export default class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div id="page-content-wrapper">
        <div className="vertical-offset-50">
          <Header />
          <Sidebar />
          <DashboardTitle />
          <DeliveryCountCard />
          <RoundProgress />
          <StatusChart />
        </div>
      </div>
    );
  }
}
