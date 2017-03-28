import React, { Component } from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';

require('./date-range.scss');

class DateRange extends Component {
  state = {
    startDate: moment().subtract(29, 'days'),
    endDate: moment(),
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    },
  }

  handleApply = (event, picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  }

  render() {
    const start = this.state.startDate.format('YYYY-MM-DD');
    const end = this.state.endDate.format('YYYY-MM-DD');
    let label = `${start} - ${end}`;
    if (start === end) {
      label = start;
    }

    return (
      <div className="col-md-4 col-sm-6 filter-input-case">
        <DatetimeRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onApply={this.handleApply}
        >
          <div className="inner-addon right-addon">
            <i className="icon icon-calendar" />
            <input type="text" className="form-control radius-secondary" value={label} />
          </div>
        </DatetimeRangePicker>
      </div>
    );
  }
}

export default DateRange;
