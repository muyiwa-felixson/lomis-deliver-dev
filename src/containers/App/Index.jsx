import React, { PropTypes } from 'react';

export default function App(props) {
  return (
    <div className="test-container">
      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};
