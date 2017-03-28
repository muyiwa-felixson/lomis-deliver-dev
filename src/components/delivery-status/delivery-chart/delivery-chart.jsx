import React, { Component, PropTypes } from 'react';

class DeliveryChart extends Component {
  state = {};
  render() {
    let totRotate = 0;
    let i = 0;
    const svgs = [];
    let strokeClass = '';
    const length = this.props.chartData.length;
    for (i = 0; i < length; i += 1) {
      const item = this.props.chartData[i];
      if (item.emphasis) {
        strokeClass = 'emphasis';
      } else {
        strokeClass = '';
      }
      const realpercent = 1256.12890625 - ((1256.12890625 * item.percent) / 100);
      const val = {
        strokeDashoffset: realpercent,
        transform: `rotate(${totRotate}deg)`,
      };
      svgs.push(<circle key={`chartixe${i}`} className={`line_chart chart${i} ${strokeClass}`} stroke={item.color} cx="225" cy="225" r="200" style={val} />);
      totRotate += ((360 * item.percent) / 100);
    }
    return (
      <svg version="1.1" id="minisvg2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="420px" height="420px" viewBox="0 0 450 450">
        <circle className="backdropblue" cx="225" cy="225" r="200" />
        { svgs }
      </svg>
    );
  }
}

DeliveryChart.propTypes = {
  chartData: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default DeliveryChart;
