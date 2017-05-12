import React, { Component, PropTypes } from 'react';

require('./loader.scss');

class MyLoader extends Component {
  state = {};

  render() {
    const MyDisplay = this.props.display;
    return (
      <div className="fader" { MyDisplay === true ?  style={{ display: none }} : style={{ display: block }} } >
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
};
export default MyLoader;
