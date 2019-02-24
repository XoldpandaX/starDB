import React from 'react';

import './error-indicator.css';
import icon from './star-of-death.png';

const ErrorIndicator = () => {
  return (
    <div className='error-indicator'>
      <img src={ icon } alt='error'/>
      <h3 className='boom'>BOOM!</h3>
      <p>something has gone terribly wrong</p>
      <p>(but we already sent droids to fix it !!!)</p>
    </div>
  );
};

export default ErrorIndicator;
