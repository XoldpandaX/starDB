import React from 'react';

import './record.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="headline-list__term">{ label }:</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export default Record;
