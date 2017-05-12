import React, { Component, PropTypes } from 'react';
import ReactToooltip from 'react-tooltip';

require('./progress-bar.scss');

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
    const full = status.completedDeliveries + status.cancelledDeliveries +
      status.failedDeliveries + status.unreportedDeliveries;
    const fullBar = (full / status.totalDeliveries) * 100;
    const expected = (status.expectedTillDateDeliveries / status.totalDeliveries) * 100;
    const complete = (status.completedDeliveries / full) * 100;
    const cancelled = (status.cancelledDeliveries / full) * 100;
    const failed = (status.failedDeliveries / full) * 100;
    const noReport = (status.unreportedDeliveries / full) * 100;
    return (
      <div className="page-content row radius-primary round-progress-box">
        <div>
          {this.checkProgressStatus() !== 'incomplete round' ?
            <h3>Round Progress <span>(Completed)</span></h3> :
            <h3>Round Progress <span>(Ongoing)</span></h3>
          }
        </div>
        <div className="round-progress">
          {this.checkProgressStatus() === 'incomplete round' ?
            <div className="progressDayDate" style={{ width: `${expected}%` }}><span><strong>Today</strong><br />{ this.handleDate() }</span><i className="icon icon-caret-down" /></div> :
            <div className="progressDayDate" />
          }
          <div className="progressFullBar">
            <div className="progressDay" style={{ width: `${fullBar}%` }} >
              <div data-tip data-for="actual-tip" className="progressStatus blueGradient" style={{ width: `${complete}%` }} />
              <ReactToooltip id="actual-tip" type="dark" effect="solid">
                <p>{`${status.completedDeliveries} Actual deliveries`}</p>
              </ReactToooltip>
              <div data-tip data-for="cancelled-tip" className="progressStatus orangeGradient" style={{ width: `${cancelled}%` }} />
              <ReactToooltip id="cancelled-tip" type="dark" effect="solid">
                <p>{`${status.cancelledDeliveries} Cancelled deliveries`}</p>
              </ReactToooltip>
              <div data-tip data-for="failed-tip" className="progressStatus redGradient" style={{ width: `${failed}%` }} />
              <ReactToooltip id="failed-tip" type="dark" effect="solid">
                <p>{`${status.failedDeliveries} Failed deliveries`}</p>
              </ReactToooltip>
              <div data-tip data-for="norep-tip" className="progressStatus greyGrad" style={{ width: `${noReport}%` }} />
              <ReactToooltip id="norep-tip" type="dark" effect="solid">
                <p>{`${status.unreportedDeliveries} Unreported Deliveries`}</p>
              </ReactToooltip>
            </div>
          </div>
          <div className="progress-date">
            <span className="span-left"><strong>Start</strong><br />{roundDetails.doc.startDate}</span>
            <span className="span-right"><strong>End</strong><br />{roundDetails.doc.endDate}</span>
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
