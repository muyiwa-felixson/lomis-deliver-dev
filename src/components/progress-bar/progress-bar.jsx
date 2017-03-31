import React, { Component, PropTypes } from 'react';

class ProgressBar extends Component {
  state = {};

  checkProgressStatus = () => { // eslint-disable-line consistent-return
    const today = new Date();
    const date = this.props.roundDetails.doc.endDate;

    if (today.getTime() > Date.parse(date)) {
      return 'complete round';
    } else if (today.getTime() === Date.parse(date)) {
      return 'just completed';
    } else if (today.getTime() < Date.parse(date)) {
      return 'incomplete round';
    }
  }

  handleDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`;
  }

  render() {
    const roundDetails = this.props.roundDetails;
    const status = this.props.status[0].value;
    const complete = (status.completedDeliveries / status.totalDeliveries) * 100;
    const position = complete + ((status.cancelledDeliveries / status.totalDeliveries) * 100);

    return (
      <div className="page-content row radius-primary round-progress-box">
        <div>
          <h3>Round Progress</h3>
        </div>
        <div className="round-progress">
          <div className="bar grey">
            { this.checkProgressStatus() === 'incomplete round' ?
              <div className="bar-day" style={{ width: `${position}%` }} /> :
              <div className="bar-day" style={{ width: '100%' }} />
            }
            <div className="bar-complete" style={{ width: `${complete}%` }} />
          </div>
          <div className="progress-date">
            <span className="span-left"><strong>Start</strong><br />{roundDetails.doc.startDate}</span>
            <span className="span-right"><strong>End</strong><br />{roundDetails.doc.endDate}</span>
            { this.checkProgressStatus() !== 'incomplete round' ?
              <div className="progress-day" style={{ width: '100%' }} /> :
              <div className="progress-day" style={{ width: `${position}%` }}>
                <span><strong>Today</strong><br />{ this.handleDate() }</span>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  status: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  roundDetails: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default ProgressBar;
