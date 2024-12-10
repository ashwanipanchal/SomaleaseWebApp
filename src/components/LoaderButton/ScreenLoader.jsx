import React from 'react';
import './Loader.css';

const ScreenLoader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="circle_loader"></div>
        <div className="circle_loader"></div>
        <div className="circle_loader"></div>
        <div className="circle_loader"></div>
      </div>
    </div>
  );
};

export default ScreenLoader;