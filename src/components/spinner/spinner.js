import React from 'react';

import './spinner.css';

const Spinner = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  return (
    <div className="lds-css ng-scope">
      <div className="lds-spinner">
        {
          arr.map((el, idx) => <div key={ el + idx }/>)
        }
      </div>
    </div>
  );
};

export default Spinner;
