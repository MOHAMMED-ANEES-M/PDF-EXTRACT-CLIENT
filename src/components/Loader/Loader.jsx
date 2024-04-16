import React from 'react';
import './Loader.css'; 

const Loader = () => {
  return (
    <div className="fixed top-[10%]  bg-transparent w-full">
      <div className="loader-container">
        <div className="loader1"></div>
        <div className="loader2"></div>
        <div className="loader3"></div>
      </div>
    </div>
  );
};

export default Loader;
