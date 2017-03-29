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
      <div>
        { this.props.round && this.props.round.roundStatus.length > 0 ?
          <div className="row dash-contain">
            <DeliveryCard color="lightblue" type="Expected" count={this.props.round.roundStatus[0].value.totalDeliveries} icon="truck-li" />
            <DeliveryCard color="blue" type="Actual" count={this.props.round.roundStatus[0].value.completedDeliveries} icon="like-li" />
            <DeliveryCard color="red" type="Failed" count={this.props.round.roundStatus[0].value.failedDeliveries} icon="info" />
            <DeliveryCard color="green" type="Billable" count={this.props.round.roundStatus[0].value.billableDeliveries} icon="receipt" />
          </div> : '' }
      </div>
    );
  }
}

DeliveryCountCard.propTypes = {
  fetchRoundCount: PropTypes.func,
  roundID: PropTypes.string,
  round: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  user: state.user,
  round: state.rounds,
});


export default connect(mapStateToProps, { fetchRoundCount })(DeliveryCountCard);