import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="loading-icon">
      <img className="loading-icon" src="https://i.ibb.co/6HVZwDk/icon-only.png"/>
      </div>
    </div>
  );
};

export default LoadingSpinner;
