import React, { Component, PropTypes } from 'react';
import { DeliveryCard } from 'components';
import { connect } from 'react-redux';
import { fetchRoundCount } from 'redux/actions/roundActions';

class DeliveryCountCard extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchRoundCount(this.props.roundID);
  }

  render() {
    return (
      <div className="row dash-contain">
        <DeliveryCard color="lightblue" type="Expected" count="20" icon="truck-li" />
        <DeliveryCard color="blue" type="Actual" count="19" icon="like-li" />
        <DeliveryCard color="red" type="Failed" count="1" icon="info" />
        <DeliveryCard color="green" type="Billable" count="21" icon="receipt" />
      </div>
    );
  }
}

DeliveryCountCard.propTypes = {
  fetchRoundCount: PropTypes.func.isRequired,
  roundID: PropTypes.string,
};

const mapStateToProps = state => ({
  // user: state.user,
  count: state.count,
});

export default connect(mapStateToProps, { fetchRoundCount })(DeliveryCountCard);
