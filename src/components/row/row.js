import React from 'react';

import './row.css';

const Row = ({ leftComponent, rightComponent }) => {
  return (
    <div className="row mb-2">
      <div className="col-md-6">
        { leftComponent }
      </div>
      <div className="col-md-6">
        { rightComponent }
      </div>
    </div>
  );
};

export default Row;
