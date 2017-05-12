import React, { Component, PropTypes } from 'react';

require('./loader.scss');

class MyLoader extends Component {
  state = {};

  render() {
    const MyDisplay = this.props.display === true ? 'block' : 'none';
    return (
      <div className="fader" style={{ display: MyDisplay }}>
        <table className="loader-table">
          <tr className="loader-top"><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td></tr>
          <tr className="loader-middle"><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td></tr>
          <tr className="loader-text"><td colSpan="10">... {`${this.props.message}`} ...</td></tr>
          <tr className="loader-base"><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td><td><div /></td></tr>
        </table>
      </div>
    );
  }
}
MyLoader.propTypes = {
  message: PropTypes.string.isRequired,
  display: PropTypes.bool,
};
export default MyLoader;
