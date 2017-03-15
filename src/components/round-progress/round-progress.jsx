import React, { Component } from 'react';

export default class RoundProgress extends Component {
  state = {};

  render() {
    return (
      <div className="page-content row radius-primary round-progress-box">
        <h3>Round Progress</h3>
        <div className="round-progress">
          <div className="bar grey">
            <div className="bar-day" />
            <div className="bar-complete" />
          </div>
          <div className="progress-date">
            <span className="span-left"><strong>Start</strong><br />02/02/17</span>
            <span className="span-right"><strong>End</strong><br />02/05/17</span>
            <div className="progress-day">
              <span><strong>Today</strong><br />20/02/17</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
