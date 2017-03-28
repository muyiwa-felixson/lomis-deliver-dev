import React, { Component, PropTypes } from 'react';

class ProgressBar extends Component {
  state = {};

  render() {
    return (
      <div className="page-content row radius-primary round-progress-box">
        <div>
          <h3>Round Progress</h3>
        </div>
        <div className="round-progress">
          <div className="bar grey">
            <div className="bar-day" style={{ width: `${this.props.position}%` }} />
            <div className="bar-complete" style={{ width: `${this.props.complete}%` }} />
          </div>
          <div className="progress-date">
            <span className="span-left"><strong>Start</strong><br />02/02/17</span>
            <span className="span-right"><strong>End</strong><br />02/05/17</span>
            <div className="progress-day" style={{ width: `${this.props.position}%` }}>
              <span><strong>Today</strong><br />20/02/17</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  position: PropTypes.string.isRequired,
  complete: PropTypes.string.isRequired,
};

export default ProgressBar;
