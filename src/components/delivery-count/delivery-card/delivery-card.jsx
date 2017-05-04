import React, { Component, PropTypes } from 'react';

class DeliveryCard extends Component {
  state = {};

  render() {
    return (
      <div className="col-md-4 col-sm-4">
        <div className="dash-summary radius-primary row">
          <div className={`col-xs-4 col-md-4 col-lg-4 micon ${this.props.color}`}>
            <i className={`icon icon-${this.props.icon}`} />
          </div>
          <div className="col-xs-8 col-md-8 col-lg-8 mdet">
            <h3>{this.props.count}</h3>
            <span className={`c${this.props.color}`}>
              {this.props.type}
            </span>
            Delivery
          </div>
        </div>
      </div>
    );
  }
}

DeliveryCard.propTypes = {
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default DeliveryCard;
